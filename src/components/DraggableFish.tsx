import { useState, useRef } from 'react';
import { useApp } from '../contexts/AppContext';

interface Fish {

    name: string;
    container: 'source' | 'destination';
}

interface DragOffset {
    x: number;
    y: number;
}

const DraggableFish: React.FC = () => {
    const {stats } = useApp();
    // State to track all fish and their containers
    const [fishes, setFishes] = useState<Fish[]>([
        { id: 1, name: '🐠 Clownfish', container: 'source' },
        { id: 2, name: '🐡 Pufferfish', container: 'source' },
        { id: 3, name: '🐟 Angelfish', container: 'source' },
        { id: 4, name: '🦈 Shark', container: 'source' },
    ]);
    
    // Track the fish being dragged
    const [draggingFish, setDraggingFish] = useState<Fish | null>(null);
    const dragOffset = useRef<DragOffset>({ x: 0, y: 0 });
    
    // Handle drag start
    const handleDragStart = (e: React.DragEvent<HTMLDivElement>, fish: Fish): void => {
        setDraggingFish(fish);
        
        // Calculate click offset within the element
        const rect = e.currentTarget.getBoundingClientRect();
        dragOffset.current = {
            x: e.clientX - rect.left,
            y: e.clientY - rect.top
        };
        
        // Add a class for visual feedback during drag
        e.currentTarget.classList.add('dragging');
    };
    
    // Handle drag over to allow dropping
    const handleDragOver = (e: React.DragEvent<HTMLDivElement>, container: string): void => {
        e.preventDefault();
    };
    
    // Handle drop of a fish into a container
    const handleDrop = (e: React.DragEvent<HTMLDivElement>, container: 'source' | 'destination'): void => {
        e.preventDefault();
        if (draggingFish) {
            // Update the fish's container
            setFishes(fishes.map(fish => 
                fish.id === draggingFish.id ? {...fish, container} : fish
            ));
            setDraggingFish(null);
        }
    };
    
    // Handle drag end to clean up
    const handleDragEnd = (e: React.DragEvent<HTMLDivElement>): void => {
        e.currentTarget.classList.remove('dragging');
        setDraggingFish(null);
    };
    
    return (
        <div className="fish-game">
            <h2>Drag the Fish</h2>
            <div className="containers">
                {/* Source container */}
                <div 
                    className="fish-container source"
                    onDragOver={(e) => handleDragOver(e, 'source')}
                    onDrop={(e) => handleDrop(e, 'source')}
                >
                    <h3>Fish Tank</h3>
                    {fishes.filter(fish => fish.container === 'source').map(fish => (
                        <div
                            key={fish.id}
                            className="fish"
                            draggable
                            onDragStart={(e) => handleDragStart(e, fish)}
                            onDragEnd={handleDragEnd}
                        >
                            {fish.name}
                        </div>
                    ))}
                </div>
                
                {/* Destination container */}
                <div 
                    className="fish-container destination"
                    onDragOver={(e) => handleDragOver(e, 'destination')}
                    onDrop={(e) => handleDrop(e, 'destination')}
                >
                    <h3>Fish Bowl</h3>
                    {fishes.filter(fish => fish.container === 'destination').map(fish => (
                        <div
                            key={fish.id}
                            className="fish"
                            draggable
                            onDragStart={(e) => handleDragStart(e, fish)}
                            onDragEnd={handleDragEnd}
                        >
                            {fish.name}
                        </div>
                    ))}
                </div>
            </div>
            
            
        </div>
    );
};

export default DraggableFish;