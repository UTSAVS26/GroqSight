import { useState, useEffect } from 'react';

function Loading() {
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (progress < 100) {
        setProgress(prev => Math.min(prev + 1, 100));
      } else {
        setLoading(false);
      }
    }, 30);
    
    return () => clearTimeout(timer);
  }, [progress]);

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-slate-900 z-50">
      <div className="relative w-64 h-32 flex items-center justify-center">
        {/* Eyes Container */}
        <div className="flex space-x-8">
          {/* Left Eye - Blue */}
          <div className="relative w-24 h-24 rounded-full bg-white flex items-center justify-center overflow-hidden">
            <div className="absolute w-24 h-24 rounded-full border-4 border-blue-500"></div>
            <div className="absolute w-12 h-12 rounded-full bg-blue-500 flex items-center justify-center">
              <div className="w-6 h-6 rounded-full bg-black">
                <div className="w-2 h-2 rounded-full bg-white ml-1 mt-1"></div>
              </div>
            </div>
            <div className="absolute w-24 h-24 rounded-full border-t-4 border-blue-300 animate-spin" style={{animationDuration: '2s'}}></div>
          </div>
          
          {/* Right Eye - Amber */}
          <div className="relative w-24 h-24 rounded-full bg-white flex items-center justify-center overflow-hidden">
            <div className="absolute w-24 h-24 rounded-full border-4 border-amber-500"></div>
            <div className="absolute w-12 h-12 rounded-full bg-amber-500 flex items-center justify-center">
              <div className="w-6 h-6 rounded-full bg-black">
                <div className="w-2 h-2 rounded-full bg-white ml-1 mt-1"></div>
              </div>
            </div>
            <div className="absolute w-24 h-24 rounded-full border-t-4 border-amber-300 animate-spin" style={{animationDuration: '1.5s'}}></div>
          </div>
        </div>
        
        {/* Loading Text */}
        <div className="absolute -bottom-16 text-center w-full">
          <p className="text-blue-400 font-bold text-lg mb-2">GroqSight Loading</p>
          <div className="w-full bg-gray-700 h-2 rounded-full">
            <div 
              className="bg-gradient-to-r from-blue-500 to-amber-500 h-2 rounded-full transition-all duration-300" 
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          <p className="text-white mt-1">{progress}%</p>
        </div>
      </div>
    </div>
  );
}

export default Loading;