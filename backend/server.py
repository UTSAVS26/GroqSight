import os
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

if __name__ == "__main__":
    # Get port from environment variable or use default
    port = int(os.environ.get("PORT", 8000))
    
    # Use an ASGI adapter for Flask
    import uvicorn
    
    # We need to use this to wrap the Flask app in an ASGI interface
    from app import app

    # Run with the Flask app wrapped properly for Uvicorn
    if os.environ.get("ENVIRONMENT") == "development":
        # For development, use Flask's built-in server with debug mode
        app.run(host="0.0.0.0", port=port, debug=True)
    else:
        # For production, use Uvicorn with the right adapter
        import subprocess
        subprocess.run([
            "uvicorn", 
            "asgi:app", 
            "--host", "0.0.0.0", 
            "--port", str(port)
        ])