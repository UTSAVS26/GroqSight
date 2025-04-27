import React, { useState, useRef } from 'react';
import { Camera, Upload } from 'lucide-react';

function Demo() {
    const [description, setDescription] = useState('');
    const [isProcessing, setIsProcessing] = useState(false);
    const [resultObject, setResultObject] = useState(null);
    const [error, setError] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);
    const fileInputRef = useRef(null);

    const handleFileUpload = (event) => {
        const file = event.target.files[0];
        if (!file) return;

        setIsProcessing(true);
        setError(null);
        const imageUrl = URL.createObjectURL(file);
        setImagePreview(imageUrl);
        processImageBlob(file);
    };

    const processImageBlob = async (blob) => {
        try {
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
                        <div className="relative group">
                            <button
                                className="px-6 py-3 bg-blue-600 text-white rounded-full hover:bg-blue-500 transition-colors flex items-center cursor-not-allowed"
                            >
                                <Camera className="mr-2" size={20} />
                                Use Camera
                            </button>
                            <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 bg-slate-700 text-white text-sm px-3 py-1 rounded-full shadow-lg group-hover:opacity-100 opacity-0 transition-opacity duration-300 whitespace-nowrap">
                                ☁️ Coming soon...
                            </div>
                        </div>

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

                    {imagePreview && (
                        <div className="mb-6 flex justify-center">
                            <img src={imagePreview} alt="Uploaded Preview" className="max-w-full rounded-xl border border-slate-700 shadow-md" />
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