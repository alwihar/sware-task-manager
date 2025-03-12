import { Task } from '../types/Task';
import { logError } from '../utils/errorUtils';

const STORAGE_KEY = 'taskManager.tasks';

export const taskService = {
  async fetchTasks(): Promise<Task[]> {
    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/todos?_limit=5');
      if (!response.ok) {
        throw new Error(`Failed to fetch tasks: ${response.status} ${response.statusText}`);
      }
      return await response.json();
    } catch (error) {
      logError(error, 'fetchTasks');
      throw error;
    }
  },
  
  saveTasks(tasks: Task[]): void {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
    } catch (error) {
      logError(error, 'saveTasks');
      throw error;
    }
  },
  
  loadTasks(): Task[] {
    try {
      const storedTasks = localStorage.getItem(STORAGE_KEY);
      return storedTasks ? JSON.parse(storedTasks) : [];
    } catch (error) {
      logError(error, 'loadTasks');
      return [];
    }
  }
}; 