import React from 'react';
import { AppProvider, useApp } from './contexts/AppContext';
import { Auth } from './components/Auth';
import { Dashboard } from './components/Dashboard';
import AnimatedSprite from './components/AnimatedSprite';

const AppContent: React.FC = () => {
  const { user } = useApp();

  if (!user) {
    return <Auth />;
  }

  return <Dashboard />;
};

function App() {
  return (
    <AppProvider>
  
      <AppContent />
    </AppProvider>
  );
}

export default App;