import { useState, useEffect } from 'react';

function Loading() {
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let interval;

    if (progress < 100) {
      interval = setInterval(() => {
        setProgress(prev => {
          const increment = Math.random() * 1.5 + 0.5; // random 0.5 to 2 for organic feel
          return Math.min(prev + increment, 100);
        });
      }, 70); // slower update (every 70ms)
    } else {
      // Wait before fading out
      const doneTimer = setTimeout(() => {
        setLoading(false);
      }, 800);
      return () => clearTimeout(doneTimer);
    }

    return () => clearInterval(interval);
  }, [progress]);

  if (!loading) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-slate-900 z-50">
      <style>
        {`
          @keyframes bounceDelay {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-15%); }
          }

          .bounce-delayed {
            animation: bounceDelay 1.3s infinite ease-in-out;
            animation-delay: 0.4s;
          }

          .fadeOut {
            animation: fadeOut 0.5s ease forwards;
          }

          @keyframes fadeOut {
            to { opacity: 0; visibility: hidden; }
          }
        `}
      </style>

      <div className="relative w-64 h-32 flex items-center justify-center">
        <div className="flex space-x-8">
          {/* Left Eye */}
          <div className="relative w-24 h-24 rounded-full bg-white flex items-center justify-center overflow-hidden animate-bounce">
            <div className="absolute w-24 h-24 rounded-full border-4 border-blue-500"></div>
            <div className="absolute w-12 h-12 rounded-full bg-blue-500 flex items-center justify-center">
              <div className="w-6 h-6 rounded-full bg-black">
                <div className="w-2 h-2 rounded-full bg-white ml-1 mt-1"></div>
              </div>
            </div>
            <div className="absolute w-24 h-24 rounded-full border-t-4 border-blue-300 animate-spin" style={{ animationDuration: '2s' }}></div>
          </div>

          {/* Right Eye */}
          <div className="relative w-24 h-24 rounded-full bg-white flex items-center justify-center overflow-hidden bounce-delayed">
            <div className="absolute w-24 h-24 rounded-full border-4 border-amber-500"></div>
            <div className="absolute w-12 h-12 rounded-full bg-amber-500 flex items-center justify-center">
              <div className="w-6 h-6 rounded-full bg-black">
                <div className="w-2 h-2 rounded-full bg-white ml-1 mt-1"></div>
              </div>
            </div>
            <div className="absolute w-24 h-24 rounded-full border-t-4 border-amber-300 animate-spin" style={{ animationDuration: '1.5s' }}></div>
          </div>
        </div>

        {/* Loading Text */}
        <div className="absolute -bottom-20 text-center w-full">
          <p className="text-blue-400 font-bold text-lg mb-2">GroqSight Loading</p>
          <div className="w-full bg-gray-700 h-2 rounded-full">
            <div 
              className="bg-gradient-to-r from-blue-500 to-amber-500 h-2 rounded-full transition-all duration-75"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          <p className="text-white mt-1 transition-all duration-75">{Math.floor(progress)}%</p>
        </div>
      </div>
    </div>
  );
}

export default Loading;