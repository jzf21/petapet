export interface User {
  id: string;
  email: string;
  name: string;
  createdAt: Date;
}

export interface Task {
  id: string;
  title: string;
  description?: string;
  completed: boolean;
  completedAt?: Date;
  createdAt: Date;
}

export interface Pet {
  name: string;
  mood: 'happy' | 'content' | 'neutral' | 'tired' | 'excited';
  petsCount: number;
  lastPetTime?: Date;
  level: number;
}

export interface UserStats {
  totalTasks: number;
  completedTasks: number;
  totalPets: number;
  currentStreak: number;
  longestStreak: number;
}