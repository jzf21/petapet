import React, { useState,useEffect} from 'react';
import { useApp } from '../contexts/AppContext';
import { Heart, Star, Award } from 'lucide-react';


import idle from '../assets/sprites/Idle.png'
import feed from '../assets/sprites/feed1.png'
import AnimatedSprite from './AnimatedSprite';

export const VirtualPet: React.FC = () => {

  const frameWidth = 32;  // update based on your sprite
  const frameHeight = 32; // update based on your sprite
  const frameCount = 4;   // total number of frames in the sheet
  const frameRate = 6;    // frames per second
  const { pet, petDog, stats } = useApp();
  const [isPetting, setIsPetting] = useState(false);
  const [frame, setFrame] = useState(0);
  const [animationUrl,setAnimationUrl]=useState(idle) ; // default animation
  useEffect(() => {
    const interval = setInterval(() => {
      setFrame((prev) => (prev + 1) % frameCount);
    }, 1000 / frameRate);
    return () => clearInterval(interval);
  }, []);

  const spriteStyle: React.CSSProperties = {
    width: `${frameWidth}px`,
    height: `${frameHeight}px`,
    backgroundImage: `url(${animationUrl})`,
    backgroundRepeat: 'no-repeat',
    backgroundPosition: `-${frame * frameWidth}px 0`,
    imageRendering: 'pixelated', // optional: for pixel art crispness
  };

  const handlePet = () => {
    setIsPetting(true);
    petDog();
    setTimeout(() => setIsPetting(false), 1000);
  };

  const getDogEmoji = () => {
    switch (pet.mood) {
      case 'excited': return '🐕‍🦺';
      case 'happy': return '🐶';
      case 'content': return '🐕';
      case 'tired': return '😴';
      default: return '🐕';
    }
  };

  const getMoodColor = () => {
    switch (pet.mood) {
      case 'excited': return 'text-orange-500';
      case 'happy': return 'text-green-500';
      case 'content': return 'text-blue-500';
      case 'tired': return 'text-gray-500';
      default: return 'text-gray-600';
    }
  };

  const getMoodMessage = () => {
    switch (pet.mood) {
      case 'excited': return `${pet.name} is super excited! You're on fire! 🔥`;
      case 'happy': return `${pet.name} is happy and wagging their tail! 🐾`;
      case 'content': return `${pet.name} is feeling content and loved 💕`;
      case 'tired': return `${pet.name} is a bit tired. Complete some tasks to cheer them up!`;
      default: return `${pet.name} is waiting for some attention 🐾`;
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 border">
      <div className="text-center">
        <div className="mb-4">
          <div className="flex items-center justify-center space-x-2 mb-2">
            <Star className="w-5 h-5 text-yellow-500" />
            <span className="font-semibold text-gray-800">Level {pet.level}</span>
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">{pet.name}</h2>
        </div>

        <div 
          className={`text-8xl mb-4 cursor-pointer transition-transform  ${
            isPetting ? 'scale-100' : 'hover:scale-100'
          }`}
          onClick={handlePet}
        >
          <div style={spriteStyle} onMouseEnter={()=>{setAnimationUrl(feed)}} onMouseLeave={()=>{setAnimationUrl(idle)}} className="mx-auto scale-[2.3]" />
          {/* <AnimatedSprite animation={isPetting ? 'excited' : 'idle'} /> */}
        </div>

        <div className="mb-4">
          <p className={`font-medium capitalize ${getMoodColor()}`}>
            {pet.mood}
          </p>
          <p className="text-gray-600 text-sm mt-1">
            {getMoodMessage()}
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="bg-pink-50 rounded-lg p-3">
            <div className="flex items-center justify-center space-x-1 mb-1">
              <Heart className="w-4 h-4 text-pink-500" />
              <span className="text-pink-700 font-semibold">Pets</span>
            </div>
            <p className="text-2xl font-bold text-pink-800">{pet.petsCount}</p>
          </div>
          <div className="bg-blue-50 rounded-lg p-3">
            <div className="flex items-center justify-center space-x-1 mb-1">
              <Award className="w-4 h-4 text-blue-500" />
              <span className="text-blue-700 font-semibold">Tasks</span>
            </div>
            <p className="text-2xl font-bold text-blue-800">{stats.completedTasks}</p>
          </div>
        </div>

        <button
          onClick={handlePet}
          disabled={isPetting}
          className={`w-full py-3 px-4 rounded-lg font-medium transition-all ${
            isPetting
              ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
              : 'bg-pink-500 text-white hover:bg-pink-600 active:scale-95'
          }`}
        >
          {isPetting ? 'Petting...' : `Pet ${pet.name} 🐾`}
        </button>

        <div className="mt-4 text-xs text-gray-500">
          <p>Complete tasks to unlock new moods and levels!</p>
        </div>
      </div>
    </div>
  );
};