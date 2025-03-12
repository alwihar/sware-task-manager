import React from 'react';
import { Task } from '../types/Task';
import { motion } from 'framer-motion';

interface TaskItemProps {
  task: Task;
  onToggle: (id: number) => void;
  onDelete: (id: number) => void;
}

const TaskItem: React.FC<TaskItemProps> = ({ task, onToggle, onDelete }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      className={`flex items-center justify-between p-5 mb-3 rounded-xl shadow-lg ${
        task.completed ? 'bg-gradient-to-r from-accent-50 to-accent-100 border-l-4 border-accent-400' : 'bg-white border-l-4 border-brand-500'
      }`}
      whileHover={{ scale: 1.02 }}
    >
      <div className="flex items-center flex-1 mr-4">
        <div 
          className={`flex items-center justify-center w-6 h-6 mr-4 border-2 rounded-full cursor-pointer ${
            task.completed 
              ? 'bg-accent-500 border-accent-500 text-white' 
              : 'border-gray-300 hover:border-brand-500'
          }`}
          onClick={() => onToggle(task.id)}
        >
          {task.completed && (
            <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          )}
        </div>
        <span
          className={`text-lg font-medium transition-all duration-200 ${
            task.completed ? 'line-through text-accent-600' : 'text-gray-800'
          }`}
        >
          {task.title}
        </span>
      </div>
      <button
        onClick={() => onDelete(task.id)}
        className="p-2 text-white bg-rose-400 rounded-lg hover:bg-rose-500 focus:outline-none focus:ring-2 focus:ring-rose-300 focus:ring-opacity-50 transition-colors duration-200"
        aria-label="Delete task"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
        </svg>
      </button>
    </motion.div>
  );
};

export default TaskItem; 