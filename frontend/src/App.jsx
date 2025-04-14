import { useEffect, useRef, useState } from 'react';
import Webcam from 'react-webcam';
import { speakText } from './utils/speech';

export default function App() {
  const webcamRef = useRef(null);
  const [description, setDescription] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  const captureAndDescribe = async () => {
    if (!webcamRef.current) return;

    const imageSrc = webcamRef.current.getScreenshot();
    setIsProcessing(true);

    try {
      const response = await fetch('http://localhost:5000/api/describe-scene', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ image: imageSrc }),
      });
      const data = await response.json();
      setDescription(data.description);
      speakText(data.description);
    } catch (error) {
      console.error('Error:', error);
      speakText("Sorry, I couldn't understand the scene.");
    } finally {
      setIsProcessing(false);
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      captureAndDescribe();
    }, 5000); // every 5 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white p-4">
      <h1 className="text-3xl font-bold mb-6">👁️‍🗨️ GroqSight</h1>
      <Webcam
        audio={false}
        ref={webcamRef}
        screenshotFormat="image/jpeg"
        className="rounded-lg mb-4 w-full max-w-md"
      />
      <button
        onClick={captureAndDescribe}
        className="bg-blue-600 px-6 py-2 rounded-md hover:bg-blue-700 mb-4"
      >
        {isProcessing ? 'Processing...' : 'Describe Scene'}
      </button>
      <div className="text-center text-lg">{description}</div>
    </div>
  );
}
