import React, { createContext, useState, useEffect, ReactNode } from 'react';
import { Task } from '../types/Task';
import { taskService } from '../services/taskService';
import { formatError } from '../utils/errorUtils';

// Define the context type
interface TaskContextType {
  tasks: Task[];
  loading: boolean;
  error: string | null;
  addTask: (title: string) => void;
  toggleTask: (id: number) => void;
  deleteTask: (id: number) => void;
}

// Create the context with a default value
export const TaskContext = createContext<TaskContextType | undefined>(undefined);

// Create a provider component
interface TaskProviderProps {
  children: ReactNode;
}

export const TaskProvider: React.FC<TaskProviderProps> = ({ children }) => {
  // Initialize state from local storage
  const [tasks, setTasks] = useState<Task[]>(() => taskService.loadTasks());
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch initial tasks from API if none in storage
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        // Only fetch if we don't have any stored tasks
        if (tasks.length === 0) {
          const data = await taskService.fetchTasks();
          setTasks(data);
        }
        setLoading(false);
      } catch (err) {
        setError(formatError(err));
        setLoading(false);
      }
    };

    fetchTasks();
  }, [tasks.length]);

  // Save tasks to local storage whenever they change
  useEffect(() => {
    taskService.saveTasks(tasks);
  }, [tasks]);

  // Add a new task
  const addTask = (title: string) => {
    const newTask: Task = {
      id: Date.now(),
      title,
      completed: false
    };
    setTasks([...tasks, newTask]);
  };

  // Toggle task completion status
  const toggleTask = (id: number) => {
    setTasks(
      tasks.map(task =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  // Delete a task
  const deleteTask = (id: number) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  // Create the context value
  const contextValue: TaskContextType = {
    tasks,
    loading,
    error,
    addTask,
    toggleTask,
    deleteTask
  };

  return (
    <TaskContext.Provider value={contextValue}>
      {children}
    </TaskContext.Provider>
  );
}; 