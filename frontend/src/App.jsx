import React from 'react';

function App() {
  return (
    <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center p-4">
      <div className="bg-gray-800 rounded-2xl shadow-2xl p-10 max-w-xl w-full space-y-6">
        <h1 className="text-4xl font-extrabold text-center text-teal-400">
          GroqSight
        </h1>
        <p className="text-lg text-center text-gray-300">
          Real-time audio descriptions for the visually impaired, powered by Groq.
        </p>
        <div className="flex flex-col space-y-4">
          <button className="bg-teal-500 hover:bg-teal-600 text-white font-semibold py-3 rounded-xl transition duration-300">
            Start Camera
          </button>
          <button className="bg-gray-700 hover:bg-gray-600 text-white py-3 rounded-xl transition duration-300">
            Customize Audio
          </button>
        </div>
        <footer className="text-sm text-gray-500 text-center mt-4">
          Built with ❤️ and Groq
        </footer>
      </div>
    </div>
  );
}

export default App;