import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User, Task, Pet, UserStats } from '../types';

interface AppContextType {
  user: User | null;
  tasks: Task[];
  pet: Pet;
  stats: UserStats;
  login: (email: string, password: string) => Promise<boolean>;
  register: (name: string, email: string, password: string) => Promise<boolean>;
  logout: () => void;
  addTask: (title: string, description?: string) => void;
  completeTask: (taskId: string) => void;
  deleteTask: (taskId: string) => void;
  petDog: () => void;
  showTaskCompleteAnimation: boolean;
  setShowTaskCompleteAnimation: (show: boolean) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};

interface AppProviderProps {
  children: ReactNode;
}

export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [pet, setPet] = useState<Pet>({
    name: 'Buddy',
    mood: 'neutral',
    petsCount: 0,
    level: 1
  });
  const [stats, setStats] = useState<UserStats>({
    totalTasks: 0,
    completedTasks: 0,
    totalPets: 0,
    currentStreak: 0,
    longestStreak: 0
  });
  const [showTaskCompleteAnimation, setShowTaskCompleteAnimation] = useState(false);

  // Load data from localStorage on mount
  useEffect(() => {
    const savedUser = localStorage.getItem('pettask_user');
    const savedTasks = localStorage.getItem('pettask_tasks');
    const savedPet = localStorage.getItem('pettask_pet');
    const savedStats = localStorage.getItem('pettask_stats');

    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    if (savedTasks) {
      setTasks(JSON.parse(savedTasks));
    }
    if (savedPet) {
      setPet(JSON.parse(savedPet));
    }
    if (savedStats) {
      setStats(JSON.parse(savedStats));
    }
  }, []);

  // Save data to localStorage whenever state changes
  useEffect(() => {
    if (user) {
      localStorage.setItem('pettask_user', JSON.stringify(user));
    }
  }, [user]);

  useEffect(() => {
    localStorage.setItem('pettask_tasks', JSON.stringify(tasks));
  }, [tasks]);

  useEffect(() => {
    localStorage.setItem('pettask_pet', JSON.stringify(pet));
  }, [pet]);

  useEffect(() => {
    localStorage.setItem('pettask_stats', JSON.stringify(stats));
  }, [stats]);

  const generateId = () => Math.random().toString(36).substring(2, 15);

  const login = async (email: string, password: string): Promise<boolean> => {
    // Simple mock authentication
    const users = JSON.parse(localStorage.getItem('pettask_users') || '[]');
    const foundUser = users.find((u: any) => u.email === email && u.password === password);
    
    if (foundUser) {
      setUser({ id: foundUser.id, email: foundUser.email, name: foundUser.name, createdAt: foundUser.createdAt });
      return true;
    }
    return false;
  };

  const register = async (name: string, email: string, password: string): Promise<boolean> => {
    const users = JSON.parse(localStorage.getItem('pettask_users') || '[]');
    
    // Check if user already exists
    if (users.find((u: any) => u.email === email)) {
      return false;
    }

    const newUser = {
      id: generateId(),
      name,
      email,
      password,
      createdAt: new Date()
    };

    users.push(newUser);
    localStorage.setItem('pettask_users', JSON.stringify(users));
    
    setUser({ id: newUser.id, email: newUser.email, name: newUser.name, createdAt: newUser.createdAt });
    return true;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('pettask_user');
  };

  const addTask = (title: string, description?: string) => {
    const newTask: Task = {
      id: generateId(),
      title,
      description,
      completed: false,
      createdAt: new Date()
    };

    setTasks(prev => [...prev, newTask]);
    setStats(prev => ({ ...prev, totalTasks: prev.totalTasks + 1 }));
  };

  const completeTask = (taskId: string) => {
    setTasks(prev => prev.map(task => 
      task.id === taskId 
        ? { ...task, completed: true, completedAt: new Date() }
        : task
    ));

    setStats(prev => ({
      ...prev,
      completedTasks: prev.completedTasks + 1,
      currentStreak: prev.currentStreak + 1,
      longestStreak: Math.max(prev.longestStreak, prev.currentStreak + 1)
    }));

    setShowTaskCompleteAnimation(true);
    setTimeout(() => setShowTaskCompleteAnimation(false), 2000);
  };

  const deleteTask = (taskId: string) => {
    setTasks(prev => prev.filter(task => task.id !== taskId));
  };

  const petDog = () => {
    setPet(prev => {
      const newPetsCount = prev.petsCount + 1;
      let newMood: Pet['mood'] = 'content';
      let newLevel = prev.level;

      if (newPetsCount < 5) newMood = 'neutral';
      else if (newPetsCount < 15) newMood = 'happy';
      else if (newPetsCount < 30) newMood = 'excited';
      else newMood = 'content';

      if (newPetsCount >= prev.level * 10) {
        newLevel = prev.level + 1;
      }

      return {
        ...prev,
        petsCount: newPetsCount,
        mood: newMood,
        level: newLevel,
        lastPetTime: new Date()
      };
    });

    setStats(prev => ({ ...prev, totalPets: prev.totalPets + 1 }));
  };

  return (
    <AppContext.Provider value={{
      user,
      tasks,
      pet,
      stats,
      login,
      register,
      logout,
      addTask,
      completeTask,
      deleteTask,
      petDog,
      showTaskCompleteAnimation,
      setShowTaskCompleteAnimation
    }}>
      {children}
    </AppContext.Provider>
  );
};