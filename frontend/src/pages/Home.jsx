import React from 'react';

function Home() {
    return (
        <section className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-white px-4 py-12">
            <div className="text-center max-w-4xl">
                {/* Title */}
                <h1 className="text-6xl font-extrabold bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 text-transparent bg-clip-text drop-shadow-lg leading-tight mb-2">
                    Welcome to <span className="text-white animate-pulse">GroqSight</span>
                </h1>

                {/* Subtitle */}
                <h2 className="text-2xl md:text-3xl font-bold mt-6 mb-6 text-white">
                    Empowering the Visually Impaired with Real-Time Audio Insights
                </h2>

                {/* Description */}
                <p className="text-lg md:text-xl text-gray-300 mb-4">
                    Our innovative vision-based accessibility tool is designed to assist visually impaired individuals by providing live audio descriptions of their surroundings. By leveraging advanced computer vision and real-time image processing, this tool captures visual information from the user's environment and converts it into clear, concise audio cues — enabling users to understand what's around them without relying on sight.
                </p>
                <p className="text-lg md:text-xl text-gray-300 mb-8">
                    Whether it’s recognizing everyday objects, identifying people, reading signs or navigating spaces, our solution aims to bridge the gap between visual cues and auditory understanding, promoting independence, safety, and confidence for the visually impaired community.
                </p>

                {/* Call to Action */}
                <button
                    className="bg-blue-600 hover:bg-blue-700 text-white py-3 px-8 rounded-xl text-lg font-semibold transition duration-300 shadow-lg"
                    onClick={() => alert('Explore more coming soon!')}
                >
                    Get Started
                </button>
            </div>
        </section>
    );
}

export default Home;