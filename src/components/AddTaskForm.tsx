import React, { useState, useCallback } from 'react';
import { motion } from 'framer-motion';

interface AddTaskFormProps {
  onAdd: (title: string) => void;
}

const AddTaskForm: React.FC<AddTaskFormProps> = ({ onAdd }) => {
  const [title, setTitle] = useState('');
  const [isInputFocused, setIsInputFocused] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const validateTitle = (value: string): boolean => {
    // Clear previous error
    setError(null);
    
    // Check if empty
    if (!value.trim()) {
      setError('Task title cannot be empty');
      return false;
    }
    
    // Check if too long
    if (value.trim().length > 100) {
      setError('Task title is too long (maximum 100 characters)');
      return false;
    }
    
    return true;
  };

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
    // Clear error when user types
    if (error) {
      setError(null);
    }
  }, [error]);

  const handleSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateTitle(title)) {
      onAdd(title.trim());
      setTitle('');
    }
  }, [title, onAdd]);

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="mb-8"
    >
      <form onSubmit={handleSubmit} className="relative">
        <div className={`p-1 transition-all duration-300 bg-white rounded-xl shadow-md ${
          isInputFocused ? 'ring-2 ring-brand-400 ring-opacity-50' : 
          error ? 'ring-2 ring-rose-400 ring-opacity-50' : ''
        }`}>
          <div className="flex items-center">
            <input
              type="text"
              value={title}
              onChange={handleChange}
              onFocus={() => setIsInputFocused(true)}
              onBlur={() => setIsInputFocused(false)}
              placeholder="Add a new task..."
              className="flex-grow p-4 text-gray-700 bg-transparent border-none rounded-l-xl focus:outline-none"
              aria-invalid={error ? 'true' : 'false'}
              aria-describedby={error ? 'task-error-message' : undefined}
              maxLength={100}
            />
            <motion.button
              type="submit"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-6 py-4 font-medium text-white transition-colors duration-300 bg-gradient-to-r from-brand-500 to-brand-600 rounded-r-xl hover:from-brand-600 hover:to-brand-700 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:ring-opacity-50"
            >
              <div className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                <span>Add Task</span>
              </div>
            </motion.button>
          </div>
        </div>
        
        {error && (
          <motion.p
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            id="task-error-message"
            className="mt-2 text-sm text-rose-500"
            role="alert"
          >
            {error}
          </motion.p>
        )}
      </form>
    </motion.div>
  );
};

export default AddTaskForm; 