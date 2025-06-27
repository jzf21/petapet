import React from 'react';
import { useApp } from '../contexts/AppContext';
import { LogOut, User } from 'lucide-react';

export const Header: React.FC = () => {
  const { user, logout } = useApp();

  return (
    <header className="bg-white border-b border-gray-200 px-6 py-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className=" p-2 rounded-lg">
            <span className="text-white text-xl">🐾</span>
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-800">PetTask</h1>
            <p className="text-gray-600 text-sm">Complete tasks, pet your companion!</p>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <User className="w-5 h-5 text-gray-600" />
            <span className="text-gray-700 font-medium">{user?.name}</span>
          </div>
          <button
            onClick={logout}
            className="flex items-center space-x-2 text-gray-600 hover:text-red-600 transition-colors"
          >
            <LogOut className="w-5 h-5" />
            <span>Logout</span>
          </button>
        </div>
      </div>
    </header>
  );
};