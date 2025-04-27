import React, { useState, useRef } from 'react';
import { Camera, Upload } from 'lucide-react';

function Demo() {
    const [isActive, setIsActive] = useState(false);
    const [description, setDescription] = useState('');
    const [isProcessing, setIsProcessing] = useState(false);
    const [resultObject, setResultObject] = useState(null);
    const [error, setError] = useState(null);
    const videoRef = useRef(null);
    const fileInputRef = useRef(null);

    const startCamera = async () => {
        try {
            const constraints = { video: true };
            const stream = await navigator.mediaDevices.getUserMedia(constraints);

            if (videoRef.current) {
                videoRef.current.srcObject = stream;
                setIsActive(true);
                setError(null);
            }
        } catch (err) {
            console.error("Error accessing camera: ", err);
            setDescription("Error accessing camera. Please check permissions.");
            setError("Camera access denied. Please allow camera permissions in your browser.");
        }
    };

    const stopCamera = () => {
        if (videoRef.current && videoRef.current.srcObject) {
            const tracks = videoRef.current.srcObject.getTracks();
            tracks.forEach(track => track.stop());
            videoRef.current.srcObject = null;
            setIsActive(false);
            setDescription('');
            setResultObject(null);
        }
    };

    const captureImage = () => {
        if (!videoRef.current) return;

        setIsProcessing(true);
        setError(null);

        const canvas = document.createElement('canvas');
        canvas.width = videoRef.current.videoWidth;
        canvas.height = videoRef.current.videoHeight;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(videoRef.current, 0, 0);

        canvas.toBlob(async (blob) => {
            await processImageBlob(blob);
        }, 'image/jpeg');
    };

    const handleFileUpload = (event) => {
        const file = event.target.files[0];
        if (!file) return;

        setIsProcessing(true);
        setError(null);
        processImageBlob(file);
    };

    const processImageBlob = async (blob) => {
        try {
            const imageUrl = URL.createObjectURL(blob);
            const fakeObjects = [
                { name: 'cat', confidence: 0.65 },
                { name: 'dog', confidence: 0.33 },
                { name: 'cat', confidence: 0.88 },
                { name: 'car', confidence: 0.5 }
            ];

            const catObjects = fakeObjects.filter(obj => obj.name.toLowerCase() === 'cat');

            if (catObjects.length === 0) {
                setDescription('No cat detected.');
                setResultObject(null);
                setError(null);
            } else {
                const bestCat = catObjects.reduce((prev, curr) =>
                    curr.confidence > prev.confidence ? curr : prev
                );

                setResultObject(bestCat);
                setDescription(`Detected: Cat (${(bestCat.confidence * 100).toFixed(1)}% confidence)`);
                setError(null);
            }
        } catch (error) {
            console.error('Error processing image:', error);
            setDescription(`Error processing image: ${error.message}`);
            setError(`Image analysis failed: ${error.message}`);
            setResultObject(null);
        } finally {
            setIsProcessing(false);
        }
    };

    return (
        <div className="pt-20 min-h-screen bg-gradient-to-b from-slate-900 to-slate-800">
            <div className="container mx-auto px-4 py-12">
                <div className="max-w-4xl mx-auto">
                    <h1 className="text-4xl font-bold mb-6 text-center bg-gradient-to-r from-blue-400 to-amber-400 bg-clip-text text-transparent">
                        GroqSight Demo
                    </h1>

                    <p className="text-gray-300 text-center mb-8">
                        Experience how GroqSight provides real-time object detection.
                    </p>

                    {error && (
                        <div className="mb-6 bg-red-900/40 border border-red-500 p-4 rounded-lg text-red-200">
                            <p className="font-medium">Error:</p>
                            <p>{error}</p>
                        </div>
                    )}

                    <div className="mb-8 flex justify-center space-x-6">
                        <button
                            onClick={startCamera}
                            disabled={isActive}
                            className="px-6 py-3 bg-blue-600 text-white rounded-full hover:bg-blue-500 transition-colors flex items-center disabled:bg-blue-800 disabled:cursor-not-allowed"
                        >
                            <Camera className="mr-2" size={20} />
                            Use Camera
                        </button>

                        <button
                            onClick={() => fileInputRef.current.click()}
                            className="px-6 py-3 bg-amber-600 text-white rounded-full hover:bg-amber-500 transition-colors flex items-center"
                        >
                            <Upload className="mr-2" size={20} />
                            Upload Image
                        </button>
                        <input
                            type="file"
                            ref={fileInputRef}
                            className="hidden"
                            accept="image/jpeg,image/png,image/jpg"
                            onChange={handleFileUpload}
                        />
                    </div>

                    {isActive && (
                        <div className="mb-8 relative rounded-2xl overflow-hidden bg-black aspect-video shadow-xl shadow-blue-500/10">
                            <video
                                ref={videoRef}
                                autoPlay
                                playsInline
                                className="w-full h-full object-cover"
                            />

                            {isProcessing && (
                                <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                                    <div className="flex flex-col items-center">
                                        <div className="h-12 w-12 rounded-full border-4 border-blue-500 border-t-transparent animate-spin mb-4"></div>
                                        <p className="text-white">Analyzing scene...</p>
                                    </div>
                                </div>
                            )}

                            {isActive && !isProcessing && (
                                <div className="absolute inset-0 pointer-events-none">
                                    <div className="absolute top-4 left-4 flex space-x-4 opacity-70">
                                        <div className="w-8 h-8 rounded-full border-2 border-blue-500 animate-pulse"></div>
                                        <div className="w-8 h-8 rounded-full border-2 border-amber-500 animate-pulse"></div>
                                    </div>
                                </div>
                            )}
                        </div>
                    )}

                    {isActive && (
                        <div className="flex justify-center space-x-4 mb-12">
                            <button
                                onClick={captureImage}
                                disabled={isProcessing}
                                className="px-6 py-3 bg-blue-600 text-white rounded-full hover:bg-blue-500 transition-colors disabled:bg-blue-800 disabled:cursor-not-allowed"
                            >
                                {isProcessing ? 'Processing...' : 'Capture Image'}
                            </button>
                            <button
                                onClick={stopCamera}
                                className="px-6 py-3 bg-gray-700 text-white rounded-full hover:bg-gray-600 transition-colors"
                            >
                                Stop Camera
                            </button>
                        </div>
                    )}

                    {description && (
                        <div className="bg-slate-800 p-6 rounded-xl border border-slate-700 animate-fade-in">
                            <h3 className="text-lg font-medium mb-3 text-blue-400">Detection Result:</h3>
                            <p className="text-gray-200">{description}</p>

                            {resultObject && (
                                <div className="mt-4 bg-slate-700 p-4 rounded-lg">
                                    <h4 className="text-md font-medium mb-2 text-amber-300">Object Details:</h4>
                                    <div className="grid grid-cols-2 gap-2">
                                        <div className="text-gray-300">Name:</div>
                                        <div className="text-white font-medium">{resultObject.name}</div>
                                        <div className="text-gray-300">Confidence:</div>
                                        <div className="text-white font-medium">{(resultObject.confidence * 100).toFixed(1)}%</div>
                                    </div>
                                </div>
                            )}

                            <div className="mt-6 flex items-center">
                                <div className="h-10 flex items-center">
                                    <div className="bg-blue-500 h-2 w-1 mx-0.5 animate-pulse delay-75"></div>
                                    <div className="bg-blue-500 h-3 w-1 mx-0.5 animate-pulse"></div>
                                    <div className="bg-blue-500 h-6 w-1 mx-0.5 animate-pulse delay-150"></div>
                                    <div className="bg-blue-500 h-4 w-1 mx-0.5 animate-pulse delay-300"></div>
                                    <div className="bg-blue-500 h-8 w-1 mx-0.5 animate-pulse delay-75"></div>
                                </div>
                                <span className="ml-3 text-sm text-gray-400">Audio playing...</span>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Demo;