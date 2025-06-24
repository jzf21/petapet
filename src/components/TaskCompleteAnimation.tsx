import React, { useEffect, useState } from 'react';
import { useApp } from '../contexts/AppContext';

export const TaskCompleteAnimation: React.FC = () => {
  const { showTaskCompleteAnimation } = useApp();
  const [fishCount, setFishCount] = useState(0);

  useEffect(() => {
    if (showTaskCompleteAnimation) {
      setFishCount(Math.floor(Math.random() * 3) + 3); // 3-5 fish
    }
  }, [showTaskCompleteAnimation]);

  if (!showTaskCompleteAnimation) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 pointer-events-none">
      <div className="bg-white rounded-2xl p-8 text-center shadow-2xl animate-bounce">
        <div className="text-6xl mb-4">🎉</div>
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Task Complete!</h2>
        <div className="text-4xl mb-4 space-x-2">
          {Array.from({ length: fishCount }, (_, i) => (
            <span 
              key={i} 
              className="inline-block animate-pulse"
              style={{ animationDelay: `${i * 200}ms` }}
            >
              🐟
            </span>
          ))}
        </div>
        <p className="text-gray-600">Your task turned into fish treats!</p>
        <p className="text-sm text-gray-500 mt-2">Now you can pet your dog! 🐾</p>
      </div>
    </div>
  );
};