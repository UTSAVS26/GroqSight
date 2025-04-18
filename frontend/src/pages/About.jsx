import React from 'react';
import { useState, useEffect } from 'react';

function About() {
    const [activeTab, setActiveTab] = useState('challenge');
    const [isInView, setIsInView] = useState({});

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        setIsInView(prev => ({ ...prev, [entry.target.id]: true }));
                    }
                });
            },
            { threshold: 0.3 }
        );

        document.querySelectorAll('section[id]').forEach(section => {
            observer.observe(section);
        });

        return () => observer.disconnect();
    }, []);

    const features = [
        {
            title: "Real-Time Object Detection",
            description: "Identifies objects in the user's view with unprecedented speed.",
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
            )
        },
        {
            title: "Contextual Scene Understanding",
            description: "Describes relationships between objects and the overall environment.",
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
                </svg>
            )
        },
        {
            title: "Text Recognition (OCR)",
            description: "Reads text aloud from signs, menus, and documents.",
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
            )
        },
        {
            title: "Customizable Audio Descriptions",
            description: "Tailored to user preferences for a personalized experience.",
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
            )
        }
    ];

    return (
        <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800 pt-20">
            <div className="container mx-auto px-4 py-16">
                <div className="max-w-4xl mx-auto">
                    <h1 className="text-4xl font-bold mb-4 text-center">
                        <span className="bg-gradient-to-r from-blue-400 to-amber-400 bg-clip-text text-transparent">
                            About GroqSight
                        </span>
                    </h1>

                    <p className="text-gray-300 text-center mb-16">
                        A vision-based accessibility tool providing live audio descriptions for visually impaired users.
                    </p>

                    {/* Tabs */}
                    <div className="flex overflow-x-auto mb-12 pb-2 justify-center">
                        <div className="inline-flex bg-slate-800 rounded-full p-1">
                            {['challenge', 'solution', 'technology', 'features'].map((tab) => (
                                <button
                                    key={tab}
                                    onClick={() => setActiveTab(tab)}
                                    className={`px-4 py-2 rounded-full font-medium transition-colors ${activeTab === tab
                                            ? 'bg-blue-600 text-white'
                                            : 'text-gray-400 hover:text-gray-200'
                                        }`}
                                >
                                    {tab.charAt(0).toUpperCase() + tab.slice(1)}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Challenge Section */}
                    <section
                        id="challenge"
                        className={`mb-16 transition-all duration-1000 ${activeTab === 'challenge' ? 'block opacity-100' : 'hidden opacity-0'
                            } ${isInView.challenge ? 'translate-y-0' : 'translate-y-10'}`}
                    >
                        <h2 className="text-2xl font-bold mb-6 text-blue-400">The Challenge: Visual Impairment in a Sighted World</h2>

                        <p className="text-gray-300 mb-6">
                            Millions worldwide live with visual impairments, facing daily challenges in navigation,
                            social interaction, and access to information. Existing accessibility tools often suffer from:
                        </p>

                        <ul className="space-y-4 text-gray-300 mb-8">
                            <li className="flex items-start">
                                <span className="text-amber-500 mr-2">•</span>
                                <span><strong className="text-amber-400">High latency</strong> – Slow response times make real-time navigation difficult</span>
                            </li>
                            <li className="flex items-start">
                                <span className="text-amber-500 mr-2">•</span>
                                <span><strong className="text-amber-400">Limited contextual understanding</strong> – Identifying objects without understanding their relationships</span>
                            </li>
                            <li className="flex items-start">
                                <span className="text-amber-500 mr-2">•</span>
                                <span><strong className="text-amber-400">Inability to adapt</strong> – Poor performance in dynamic environments</span>
                            </li>
                        </ul>

                        <p className="text-gray-300">
                            These limitations significantly hinder independence and quality of life for visually impaired individuals.
                        </p>
                    </section>

                    {/* Solution Section */}
                    <section
                        id="solution"
                        className={`mb-16 transition-all duration-1000 ${activeTab === 'solution' ? 'block opacity-100' : 'hidden opacity-0'
                            } ${isInView.solution ? 'translate-y-0' : 'translate-y-10'}`}
                    >
                        <h2 className="text-2xl font-bold mb-6 text-blue-400">Our Solution: GroqSight</h2>

                        <p className="text-gray-300 mb-6">
                            GroqSight leverages Groq's unparalleled speed to provide near-instantaneous audio descriptions
                            of the surrounding environment. It acts as an "audio eye," empowering users to:
                        </p>

                        <ul className="space-y-4 text-gray-300 mb-8">
                            <li className="flex items-start">
                                <span className="text-blue-500 mr-2">•</span>
                                <span>Navigate unfamiliar spaces safely and confidently</span>
                            </li>
                            <li className="flex items-start">
                                <span className="text-blue-500 mr-2">•</span>
                                <span>Understand complex scenes and social situations</span>
                            </li>
                            <li className="flex items-start">
                                <span className="text-blue-500 mr-2">•</span>
                                <span>Access information quickly and easily</span>
                            </li>
                        </ul>

                        <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
                            <h3 className="text-xl font-medium mb-4 text-blue-400">How GroqSight Works</h3>
                            <ol className="space-y-3 text-gray-300">
                                <li className="flex items-start">
                                    <span className="bg-blue-600 text-white rounded-full w-6 h-6 flex items-center justify-center mr-3 flex-shrink-0">1</span>
                                    <span>The system captures a live video feed of the user's surroundings</span>
                                </li>
                                <li className="flex items-start">
                                    <span className="bg-blue-600 text-white rounded-full w-6 h-6 flex items-center justify-center mr-3 flex-shrink-0">2</span>
                                    <span>Pre-processing prepares the image for analysis</span>
                                </li>
                                <li className="flex items-start">
                                    <span className="bg-blue-600 text-white rounded-full w-6 h-6 flex items-center justify-center mr-3 flex-shrink-0">3</span>
                                    <span>Groq's high-speed inference analyzes the scene using advanced computer vision</span>
                                </li>
                                <li className="flex items-start">
                                    <span className="bg-blue-600 text-white rounded-full w-6 h-6 flex items-center justify-center mr-3 flex-shrink-0">4</span>
                                    <span>The system generates detailed, natural-language descriptions</span>
                                </li>
                                <li className="flex items-start">
                                    <span className="bg-blue-600 text-white rounded-full w-6 h-6 flex items-center justify-center mr-3 flex-shrink-0">5</span>
                                    <span>Text-to-speech converts descriptions into clear audio for the user</span>
                                </li>
                            </ol>
                        </div>
                    </section>

                    {/* Technology Section */}
                    <section
                        id="technology"
                        className={`mb-16 transition-all duration-1000 ${activeTab === 'technology' ? 'block opacity-100' : 'hidden opacity-0'
                            } ${isInView.technology ? 'translate-y-0' : 'translate-y-10'}`}
                    >
                        <h2 className="text-2xl font-bold mb-6 text-blue-400">The Technology Behind GroqSight</h2>

                        <p className="text-gray-300 mb-6">
                            GroqSight combines cutting-edge technologies to deliver real-time, accurate scene descriptions:
                        </p>

                        <div className="grid md:grid-cols-2 gap-6 mb-8">
                            <div className="bg-slate-800 p-5 rounded-lg border border-slate-700">
                                <h3 className="text-lg font-medium mb-3 text-blue-400">Groq's Speed Advantage</h3>
                                <p className="text-gray-300">
                                    Leveraging Groq's unparalleled inference speed to process images and generate descriptions
                                    with minimal latency, enabling true real-time operation.
                                </p>
                            </div>

                            <div className="bg-slate-800 p-5 rounded-lg border border-slate-700">
                                <h3 className="text-lg font-medium mb-3 text-blue-400">Computer Vision</h3>
                                <p className="text-gray-300">
                                    Advanced object detection, scene segmentation, and image classification models identify
                                    elements in the user's environment with high accuracy.
                                </p>
                            </div>

                            <div className="bg-slate-800 p-5 rounded-lg border border-slate-700">
                                <h3 className="text-lg font-medium mb-3 text-blue-400">Natural Language Processing</h3>
                                <p className="text-gray-300">
                                    Transforms visual data into clear, contextually rich descriptions that prioritize
                                    information most relevant to the user.
                                </p>
                            </div>

                            <div className="bg-slate-800 p-5 rounded-lg border border-slate-700">
                                <h3 className="text-lg font-medium mb-3 text-blue-400">Text-to-Speech</h3>
                                <p className="text-gray-300">
                                    High-quality voice synthesis delivers descriptions clearly and naturally, with
                                    customizable voice options to match user preferences.
                                </p>
                            </div>
                        </div>

                        <div className="bg-gradient-to-r from-blue-900/30 to-amber-900/30 p-6 rounded-xl border border-blue-800/30">
                            <h3 className="text-lg font-medium mb-3 text-blue-400">Modular Architecture</h3>
                            <p className="text-gray-300">
                                GroqSight's modular design allows for continuous improvement and the addition of new
                                capabilities without disrupting the core functionality. This ensures the system can
                                evolve alongside advances in AI and user feedback.
                            </p>
                        </div>
                    </section>

                    {/* Features Section */}
                    <section
                        id="features"
                        className={`mb-16 transition-all duration-1000 ${activeTab === 'features' ? 'block opacity-100' : 'hidden opacity-0'
                            } ${isInView.features ? 'translate-y-0' : 'translate-y-10'}`}
                    >
                        <h2 className="text-2xl font-bold mb-6 text-blue-400">Key Features</h2>

                        <div className="grid md:grid-cols-2 gap-6">
                            {features.map((feature, index) => (
                                <div
                                    key={index}
                                    className="bg-slate-800 p-6 rounded-lg border border-slate-700 hover:border-blue-500/50 transition-colors"
                                >
                                    <div className="flex items-center mb-4">
                                        <div className="w-10 h-10 rounded-full bg-blue-600/20 flex items-center justify-center mr-3">
                                            <span className="text-blue-400">
                                                {feature.icon}
                                            </span>
                                        </div>
                                        <h3 className="text-lg font-medium text-white">{feature.title}</h3>
                                    </div>
                                    <p className="text-gray-300">
                                        {feature.description}
                                    </p>
                                </div>
                            ))}
                        </div>

                        <div className="mt-12 bg-gradient-to-r from-blue-500/10 to-amber-500/10 rounded-xl p-6 border border-blue-500/20">
                            <h3 className="text-xl font-medium mb-4 text-center text-blue-400">Beyond Basic Accessibility</h3>
                            <p className="text-gray-300 text-center">
                                GroqSight isn't just about identifying objects – it's about understanding context, relationships,
                                and providing meaningful information that enables truly independent living.
                            </p>
                        </div>
                    </section>
                </div>
            </div>
        </div>
    );
}

export default About;