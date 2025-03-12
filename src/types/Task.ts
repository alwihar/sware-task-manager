export interface Task {
  id: number;
  title: string;
  completed: boolean;
  userId?: number; // Optional as we might not need it for our app
} 