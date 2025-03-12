import React, { useCallback } from 'react';
import AddTaskForm from './components/AddTaskForm';
import TaskList from './components/TaskList';
import { useTasks } from './hooks/useTasks';
import { motion } from 'framer-motion';
import { TaskProvider } from './context/TaskContext';

function App() {
  return (
    <TaskProvider>
      <AppContent />
    </TaskProvider>
  );
}

// separate component to use the context
function AppContent() {
  const { tasks, loading, error, addTask, toggleTask, deleteTask } = useTasks();

  const handleAddTask = useCallback((title: string) => {
    addTask(title);
  }, [addTask]);

  const handleToggleTask = useCallback((id: number) => {
    toggleTask(id);
  }, [toggleTask]);

  const handleDeleteTask = useCallback((id: number) => {
    deleteTask(id);
  }, [deleteTask]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-brand-50 via-purple-50 to-accent-50">
      <div className="container px-4 py-12 mx-auto max-w-2xl">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8 text-center"
        >
          <h1 className="mb-2 text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-brand-600 to-accent-500">
            Task Manager
          </h1>
          <p className="text-gray-600">Organize your tasks efficiently</p>
        </motion.div>
        
        <AddTaskForm onAdd={handleAddTask} />
        
        {loading ? (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="p-8 text-center bg-white rounded-xl shadow-md"
          >
            <div className="inline-block w-8 h-8 border-4 border-brand-500 border-t-transparent rounded-full animate-spin"></div>
            <p className="mt-4 text-gray-500">Loading your tasks...</p>
          </motion.div>
        ) : error ? (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="p-6 text-center bg-accent-50 rounded-xl shadow-md border border-accent-100"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="w-12 h-12 mx-auto mb-4 text-accent-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <p className="text-lg font-medium text-accent-700">Error</p>
            <p className="mt-2 text-accent-600">{error}</p>
          </motion.div>
        ) : (
          <TaskList 
            tasks={tasks} 
            onToggle={handleToggleTask} 
            onDelete={handleDeleteTask} 
          />
        )}
      </div>
    </div>
  );
}

export default App;
