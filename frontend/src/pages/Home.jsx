import React from 'react';

function Home() {
    return (
        <section className="min-h-screen flex flex-col items-center justify-center text-white bg-gray-900 p-6">
        <div className="text-center">
            <h1 className="text-5xl font-extrabold mb-6 bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 text-transparent bg-clip-text drop-shadow-lg leading-tight">
                Welcome to <span className="animate-pulse">GroqSight</span>
            </h1>
                
                
            </div>
            <div className="mt-12 text-center max-w-3xl">
                <h2 className="text-3xl font-bold mb-4">
                    Empowering the Visually Impaired with Real-Time Audio Insights
                </h2>
                <p className="text-lg mb-4">
                    Our innovative vision-based accessibility tool is designed to assist visually impaired individuals by providing live audio descriptions of their surroundings. By leveraging advanced computer vision and real-time image processing, this tool captures visual information from the user's environment and converts it into clear, concise audio cues — enabling users to understand what's around them without relying on sight.
                </p>
                <p className="text-lg">
                    Whether it’s recognizing everyday objects, identifying people, reading signs or navigating spaces, our solution aims to bridge the gap between visual cues and auditory understanding, promoting independence, safety, and confidence for the visually impaired community.
                </p>

                <div className="mb-4"></div>

                <button
                    className="bg-blue-500 hover:bg-blue-600 text-white py-3 px-6 rounded-lg text-lg font-medium transition duration-200"
                    onClick={() => alert('Explore more coming soon!')}
                >
                    Get Started
                </button>

            </div>
        </section>
    );
}

export default Home;
