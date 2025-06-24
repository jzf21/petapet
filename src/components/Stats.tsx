import React from 'react';
import { useApp } from '../contexts/AppContext';
import { TrendingUp, Target, Flame, Trophy } from 'lucide-react';

export const Stats: React.FC = () => {
  const { stats, tasks } = useApp();
  
  const completionRate = stats.totalTasks > 0 
    ? Math.round((stats.completedTasks / stats.totalTasks) * 100) 
    : 0;

  const activeTasks = tasks.filter(task => !task.completed).length;

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 border">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">Your Progress</h3>
      
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-green-50 rounded-lg p-4">
          <div className="flex items-center space-x-2 mb-2">
            <Target className="w-5 h-5 text-green-600" />
            <span className="text-green-700 font-medium">Completion</span>
          </div>
          <p className="text-2xl font-bold text-green-800">{completionRate}%</p>
          <p className="text-green-600 text-sm">{stats.completedTasks} of {stats.totalTasks}</p>
        </div>

        <div className="bg-orange-50 rounded-lg p-4">
          <div className="flex items-center space-x-2 mb-2">
            <Flame className="w-5 h-5 text-orange-600" />
            <span className="text-orange-700 font-medium">Streak</span>
          </div>
          <p className="text-2xl font-bold text-orange-800">{stats.currentStreak}</p>
          <p className="text-orange-600 text-sm">Best: {stats.longestStreak}</p>
        </div>

        <div className="bg-blue-50 rounded-lg p-4">
          <div className="flex items-center space-x-2 mb-2">
            <TrendingUp className="w-5 h-5 text-blue-600" />
            <span className="text-blue-700 font-medium">Active</span>
          </div>
          <p className="text-2xl font-bold text-blue-800">{activeTasks}</p>
          <p className="text-blue-600 text-sm">tasks remaining</p>
        </div>

        <div className="bg-purple-50 rounded-lg p-4">
          <div className="flex items-center space-x-2 mb-2">
            <Trophy className="w-5 h-5 text-purple-600" />
            <span className="text-purple-700 font-medium">Total Pets</span>
          </div>
          <p className="text-2xl font-bold text-purple-800">{stats.totalPets}</p>
          <p className="text-purple-600 text-sm">lifetime</p>
        </div>
      </div>
    </div>
  );
};