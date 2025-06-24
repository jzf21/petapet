import React, { useEffect, useState } from 'react';
import spriteSheet from '../assets/sprites/sprites.png'; // Adjust the path as necessary


type AnimationKey = 'idle' | 'jump' | 'sleep' | 'box' | 'excited';

const frameSize = 49.625
const frameRate = 8; // 8 fps

const animations: Record<AnimationKey, { row: number; frames: number }> = {
  idle:    { row: 0, frames: 10 },
  jump:    { row: 1, frames: 16 },
  sleep:   { row: 3, frames: 16 },
  box:     { row: 5, frames: 16 },
  excited: { row: 7, frames: 16 },
};

interface Props {
  animation: AnimationKey;
  scale?: number;
}

const AnimatedSprite: React.FC<Props> = ({ animation, scale = 2 }) => {
  const [frame, setFrame] = useState(0);
  const { row, frames } = animations[animation];

  useEffect(() => {
    const interval = setInterval(() => {
      setFrame((prev) => (prev + 1) % frames);
    }, 1000 / frameRate);
    return () => clearInterval(interval);
  }, [animation, frames]);

  const style: React.CSSProperties = {
    width: `${frameSize * scale}px`,
    height: `${frameSize * scale}px`,
    backgroundImage: `url(${spriteSheet})`,
    backgroundPosition: `-${frame * frameSize}px -${row * frameSize}px`,
    backgroundRepeat: 'no-repeat',
    imageRendering: 'pixelated',
   backgroundSize: `${16 * frameSize * scale}px ${16 *frameSize * scale}px`
  };

  return <div style={style} />;
};

export default AnimatedSprite;
