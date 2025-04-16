import React from 'react';
import { useState, useRef, useEffect } from 'react';
import { Camera } from 'lucide-react';

function Demo() {
    const [isActive, setIsActive] = useState(false);
    const [description, setDescription] = useState('');
    const [isProcessing, setIsProcessing] = useState(false);
    const videoRef = useRef(null);

    // Initialize camera when component mounts
    useEffect(() => {
        return () => {
            // Clean up camera stream when component unmounts
            if (videoRef.current && videoRef.current.srcObject) {
                const tracks = videoRef.current.srcObject.getTracks();
                tracks.forEach(track => track.stop());
            }
        };
    }, []);

    const startCamera = async () => {
        try {
            const constraints = { video: true };
            const stream = await navigator.mediaDevices.getUserMedia(constraints);

            if (videoRef.current) {
                videoRef.current.srcObject = stream;
                setIsActive(true);
            }
        } catch (err) {
            console.error("Error accessing camera: ", err);
            setDescription("Error accessing camera. Please check permissions.");
        }
    };

    const stopCamera = () => {
        if (videoRef.current && videoRef.current.srcObject) {
            const tracks = videoRef.current.srcObject.getTracks();
            tracks.forEach(track => track.stop());
            videoRef.current.srcObject = null;
            setIsActive(false);
            setDescription('');
        }
    };

    const processFeed = () => {
        if (!isActive) return;

        // Simulate processing delay and response
        setIsProcessing(true);

        setTimeout(() => {
            const descriptions = [
                "A person is sitting at a wooden desk with a laptop and coffee mug. There's a window to their left with daylight coming through.",
                "A bookshelf with approximately 30 books of varying sizes. A small plant sits on the top shelf.",
                "A kitchen with white cabinets. There's a refrigerator on the left and a countertop with a bowl of fruit.",
                "An office space with two people working at desks. One person is typing on a keyboard.",
                "A living room with a gray sofa and coffee table. A TV is mounted on the wall opposite the sofa."
            ];

            setDescription(descriptions[Math.floor(Math.random() * descriptions.length)]);
            setIsProcessing(false);
        }, 1500);
    };

    return (
        <div className="pt-20 min-h-screen bg-gradient-to-b from-slate-900 to-slate-800">
            <div className="container mx-auto px-4 py-12">
                <div className="max-w-4xl mx-auto">
                    <h1 className="text-4xl font-bold mb-6 text-center bg-gradient-to-r from-blue-400 to-amber-400 bg-clip-text text-transparent">
                        GroqSight Demo
                    </h1>

                    <p className="text-gray-300 text-center mb-12">
                        Experience how GroqSight provides real-time audio descriptions for the visually impaired.
                    </p>

                    {/* Camera View */}
                    <div className="mb-8 relative rounded-2xl overflow-hidden bg-black aspect-video shadow-xl shadow-blue-500/10">
                        {!isActive ? (
                            <div className="absolute inset-0 flex flex-col items-center justify-center text-gray-400">
                                <Camera size={64} className="mb-4 opacity-60" />
                                <p>Camera feed will appear here</p>
                                <button
                                    onClick={startCamera}
                                    className="mt-6 px-6 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-500 transition-colors"
                                >
                                    Start Camera
                                </button>
                            </div>
                        ) : (
                            <video
                                ref={videoRef}
                                autoPlay
                                playsInline
                                className="w-full h-full object-cover"
                            />
                        )}

                        {/* Processing Indicator */}
                        {isProcessing && (
                            <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                                <div className="flex flex-col items-center">
                                    <div className="h-12 w-12 rounded-full border-4 border-blue-500 border-t-transparent animate-spin mb-4"></div>
                                    <p className="text-white">Analyzing scene...</p>
                                </div>
                            </div>
                        )}

                        {/* Eyes Animation Overlay */}
                        {isActive && !isProcessing && (
                            <div className="absolute inset-0 pointer-events-none">
                                <div className="absolute top-4 left-4 flex space-x-4 opacity-70">
                                    <div className="w-8 h-8 rounded-full border-2 border-blue-500 animate-pulse"></div>
                                    <div className="w-8 h-8 rounded-full border-2 border-amber-500 animate-pulse"></div>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Controls */}
                    <div className="flex justify-center space-x-4 mb-12">
                        {isActive ? (
                            <>
                                <button
                                    onClick={processFeed}
                                    disabled={isProcessing}
                                    className="px-6 py-3 bg-blue-600 text-white rounded-full hover:bg-blue-500 transition-colors disabled:bg-blue-800 disabled:cursor-not-allowed"
                                >
                                    {isProcessing ? 'Processing...' : 'Analyze Scene'}
                                </button>
                                <button
                                    onClick={stopCamera}
                                    className="px-6 py-3 bg-gray-700 text-white rounded-full hover:bg-gray-600 transition-colors"
                                >
                                    Stop Camera
                                </button>
                            </>
                        ) : null}
                    </div>

                    {/* Description Output */}
                    {description && (
                        <div className="bg-slate-800 p-6 rounded-xl border border-slate-700 animate-fade-in">
                            <h3 className="text-lg font-medium mb-3 text-blue-400">Scene Description:</h3>
                            <p className="text-gray-200">{description}</p>

                            {/* Text-to-Speech Simulation */}
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