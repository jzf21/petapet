import React from 'react';
import { Header } from './Header';
import { TaskInput } from './TaskInput';
import { TaskList } from './TaskList';
import { VirtualPet } from './VirtualPet';
import { Stats } from './Stats';
import { TaskCompleteAnimation } from './TaskCompleteAnimation';

export const Dashboard: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Tasks */}
          <div className="lg:col-span-2 space-y-6 order-2 lg:order-1">
            <TaskInput />
            <TaskList />
          </div>

          {/* Right Column - Pet & Stats */}
          <div className="space-y-6 order-1 lg:order-2">
            <VirtualPet />
            <Stats />
          </div>
        </div>
      </main>

      <TaskCompleteAnimation />
    </div>
  );
};