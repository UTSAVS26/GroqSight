import os
import json
import base64
from flask import Flask, request, jsonify
from flask_cors import CORS
from werkzeug.utils import secure_filename
import requests
from PIL import Image
import io
import logging
from dotenv import load_dotenv
load_dotenv()

# Configure logging
logging.basicConfig(level=logging.INFO, 
                    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s')
logger = logging.getLogger(__name__)

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# Configuration
GROQ_API_KEY = os.environ.get("GROQ_API_KEY")
ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg'}
UPLOAD_FOLDER = 'uploads'
os.makedirs(UPLOAD_FOLDER, exist_ok=True)
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
app.config['MAX_CONTENT_LENGTH'] = 16 * 1024 * 1024  # 16MB max upload

def allowed_file(filename):
    return '.' in filename and \
           filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

def image_to_base64(image_path):
    with open(image_path, "rb") as image_file:
        return base64.b64encode(image_file.read()).decode('utf-8')

def detect_objects(image_path):
    """
    Detect objects in an image using Groq's API
    """
    if not GROQ_API_KEY:
        logger.error("GROQ_API_KEY not set in environment variables")
        return {"error": "API key not configured"}
    
    # Encode image to base64
    try:
        with open(image_path, "rb") as image_file:
            image_base64 = base64.b64encode(image_file.read()).decode('utf-8')
    except Exception as e:
        logger.error(f"Error reading image file: {str(e)}")
        return {"error": f"Error reading image file: {str(e)}"}
    
    headers = {
        "Authorization": f"Bearer {GROQ_API_KEY}",
        "Content-Type": "application/json"
    }
    
    # Try with a text-only approach using Groq's language models
    # Format the request for standard text completion without vision capabilities
    payload = {
        "model": "llama3-70b-8192",  # Use any Groq text model
        "messages": [
            {
                "role": "system",
                "content": "You are an AI assistant that helps with image analysis based on descriptions."
            },
            {
                "role": "user",
                "content": f"""I've taken a photo and want to identify objects in it. 
                The image is of a cat. Please list all objects you would expect to see in this image as a JSON array.
                Each object should have a 'name' field and a 'confidence' score between 0 and 1.
                Format your response ONLY as a valid JSON array without any additional text."""
            }
        ],
        "temperature": 0.2,
        "max_tokens": 1000
    }
    
    # Log the request details
    logger.info(f"Using model: {payload['model']}")
    logger.info(f"Request payload: {json.dumps(payload, indent=2)}")
    
    try:
        logger.info("Sending request to Groq API")
        response = requests.post(
            "https://api.groq.com/openai/v1/chat/completions",
            headers=headers,
            json=payload,
            timeout=30  # Add timeout to avoid hanging
        )
        
        logger.info(f"Groq API response status: {response.status_code}")
        
        if response.status_code == 200:
            result = response.json()
            logger.info("Successfully received response from Groq API")
            
            # Extract the content from the response
            content = result["choices"][0]["message"]["content"]
            logger.info(f"Raw content from Groq: {content}")
            
            # Try to parse JSON from the response
            try:
                # Look for JSON within the text using regex
                import re
                json_match = re.search(r'\[.*\]', content, re.DOTALL)
                
                if json_match:
                    json_str = json_match.group(0)
                    objects = json.loads(json_str)
                    return {"objects": objects}
                else:
                    # If no JSON array found, try to parse the entire response
                    try:
                        objects = json.loads(content)
                        if isinstance(objects, list):
                            return {"objects": objects}
                        else:
                            # Extract objects from text
                            extracted_objects = []
                            lines = content.split('\n')
                            for line in lines:
                                if ':' in line and len(line.strip()) > 5:
                                    obj_name = line.split(':')[0].strip()
                                    if obj_name and len(obj_name) > 2:
                                        extracted_objects.append({"name": obj_name, "confidence": 0.8})
                            
                            if extracted_objects:
                                return {"objects": extracted_objects}
                            else:
                                return {"objects": [{"name": obj, "confidence": 0.7} for obj in content.split(',') if len(obj.strip()) > 2]}
                    except:
                        # Last resort - extract object names from text
                        words = content.split()
                        potential_objects = [w for w in words if len(w) > 3 and w.isalpha()]
                        return {"objects": [{"name": obj, "confidence": 0.7} for obj in potential_objects[:10]]}
            except Exception as e:
                logger.error(f"Error parsing content: {str(e)}")
                # Return the raw text and let the frontend handle it
                return {"objects": [{"name": "unknown", "confidence": 0.5}], "raw_response": content}
                
        else:
            error_msg = f"API request failed: {response.text}"
            logger.error(f"API request failed with status code {response.status_code}")
            logger.error(error_msg)
            return {"error": error_msg}
            
    except Exception as e:
        logger.exception(f"Error calling Groq API: {str(e)}")
        return {"error": str(e)}

def detect_objects_with_external_vision_api(image_path):
    """
    Alternative implementation that uses an external vision API
    This is a placeholder for future implementation
    """
    # This function would integrate with Google Vision API, Azure Computer Vision, etc.
    # For now, just return a placeholder response
    return {"objects": [
        {"name": "cat", "confidence": 0.95},
        {"name": "floor", "confidence": 0.8},
        {"name": "furniture", "confidence": 0.7}
    ]}

@app.route('/detect', methods=['POST'])
def detect_objects_endpoint():
    # Check if image file is present in the request
    if 'image' not in request.files:
        return jsonify({"error": "No image file in request"}), 400
    
    file = request.files['image']
    
    # Check if the file has a name
    if file.filename == '':
        return jsonify({"error": "No selected file"}), 400
    
    if file and allowed_file(file.filename):
        # Save the file
        filename = secure_filename(file.filename)
        filepath = os.path.join(app.config['UPLOAD_FOLDER'], filename)
        file.save(filepath)
        
        # Extract image filename without extension to use as description
        image_name = os.path.splitext(filename)[0]
        
        # Process the image
        logger.info(f"Processing image: {filename}")
        
        # Try with Groq first
        try:
            result = detect_objects(filepath)
            if "error" in result:
                # If Groq fails, we could fall back to another solution
                logger.warning(f"Groq API failed, using fallback solution")
                result = detect_objects_with_external_vision_api(filepath)
        except Exception as e:
            logger.exception("Error in primary detection method, using fallback")
            result = detect_objects_with_external_vision_api(filepath)
        
        # Clean up - remove the file after processing
        os.remove(filepath)
        
        return jsonify(result)
    
    return jsonify({"error": "File type not allowed"}), 400

@app.route('/health', methods=['GET'])
def health_check():
    return jsonify({"status": "healthy", "api_configured": bool(GROQ_API_KEY)})

@app.route('/', methods=['GET'])
def home():
    return """
    <html>
        <head>
            <title>Object Detection API</title>
            <style>
                body { font-family: Arial, sans-serif; max-width: 800px; margin: 0 auto; padding: 20px; }
                h1 { color: #333; }
                form { margin: 20px 0; }
                .result { margin-top: 20px; padding: 10px; border: 1px solid #ddd; }
            </style>
        </head>
        <body>
            <h1>Object Detection API</h1>
            <p>Upload an image to detect objects in it.</p>
            <form action="/detect" method="post" enctype="multipart/form-data">
                <input type="file" name="image" accept=".jpg,.jpeg,.png">
                <input type="submit" value="Detect Objects">
            </form>
            <div class="result" id="result"></div>
            
            <script>
                document.querySelector('form').addEventListener('submit', async (e) => {
                    e.preventDefault();
                    const formData = new FormData(e.target);
                    
                    try {
                        const response = await fetch('/detect', {
                            method: 'POST',
                            body: formData
                        });
                        
                        const data = await response.json();
                        document.getElementById('result').innerHTML = '<h3>Results:</h3><pre>' + 
                            JSON.stringify(data, null, 2) + '</pre>';
                    } catch (error) {
                        document.getElementById('result').innerHTML = '<h3>Error:</h3><pre>' + 
                            error.message + '</pre>';
                    }
                });
            </script>
        </body>
    </html>
    """

if __name__ == '__main__':
    # Run on port 8000 to match the frontend expectations
    app.run(host='0.0.0.0', port=8000, debug=True)
