import React, { useEffect, useState } from 'react';
import { Task } from '../types/Task';
import TaskItem from './TaskItem';
import { AnimatePresence, motion } from 'framer-motion';

interface TaskListProps {
  tasks: Task[];
  onToggle: (id: number) => void;
  onDelete: (id: number) => void;
}

const TaskList: React.FC<TaskListProps> = ({ tasks, onToggle, onDelete }) => {
  // Calculate task statistics
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter(task => task.completed).length;
  const progressPercentage = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;
  const allTasksCompleted = totalTasks > 0 && completedTasks === totalTasks;
  
  // State to control confetti animation
  const [showConfetti, setShowConfetti] = useState(false);
  
  // Start confetti when all tasks are completed and stop after 3 seconds
  useEffect(() => {
    if (allTasksCompleted) {
      setShowConfetti(true);
      const timer = setTimeout(() => {
        setShowConfetti(false);
      }, 3000);
      
      return () => clearTimeout(timer);
    }
  }, [allTasksCompleted]);

  if (tasks.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="p-8 text-center bg-white rounded-xl shadow-md"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="w-16 h-16 mx-auto mb-4 text-brand-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
        </svg>
        <p className="text-xl font-medium text-brand-500">No tasks yet</p>
        <p className="mt-2 text-brand-300">Add a task to get started!</p>
      </motion.div>
    );
  }

  // Confetti animation variants
  const confettiVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.1
      }
    }
  };

  const confettiItemVariants = {
    hidden: { 
      opacity: 0,
      y: 0,
      x: 0
    },
    visible: (i: number) => ({
      opacity: [0, 1, 1, 0],
      y: [0, -100 - Math.random() * 100],
      x: [0, (Math.random() - 0.5) * 200],
      rotate: [0, Math.random() * 360],
      transition: {
        duration: 2,
        repeat: 0,
        delay: i * 0.1,
        ease: "easeOut"
      }
    })
  };

  return (
    <div className="space-y-6">
      {/* Task progress */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="p-5 bg-white rounded-xl shadow-md"
      >
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-sm font-medium text-gray-500">Progress</h3>
          <span className="text-sm font-medium text-accent-600">{completedTasks}/{totalTasks} completed</span>
        </div>
        <div className="w-full h-2 bg-gray-200 rounded-full">
          <motion.div 
            className="h-2 bg-gradient-to-r from-brand-400 to-accent-500 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${progressPercentage}%` }}
            transition={{ duration: 0.5 }}
          />
        </div>
      </motion.div>

      {/* Celebration animation when all tasks are completed */}
      {allTasksCompleted && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="relative p-6 mb-6 text-center bg-gradient-to-r from-brand-100 to-accent-100 rounded-xl shadow-md overflow-hidden"
        >
          <motion.div
            animate={{ 
              scale: [1, 1.1, 1],
              rotate: [0, 5, -5, 0]
            }}
            transition={{ 
              duration: 1.5, 
              repeat: Infinity,
              repeatType: "reverse"
            }}
            className="mb-4"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="w-16 h-16 mx-auto text-accent-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </motion.div>
          <h3 className="mb-2 text-xl font-bold text-brand-600">All tasks completed!</h3>
          <p className="text-accent-600">Great job! You've completed all your tasks.</p>
          
          {/* Confetti animation */}
          {showConfetti && (
            <motion.div 
              className="absolute top-0 left-0 w-full h-full pointer-events-none"
              variants={confettiVariants}
              initial="hidden"
              animate="visible"
            >
              {[...Array(20)].map((_, i) => (
                <motion.div
                  key={i}
                  custom={i}
                  variants={confettiItemVariants}
                  className={`absolute top-1/2 left-1/2 w-3 h-3 rounded-full ${
                    i % 3 === 0 ? 'bg-brand-400' : i % 3 === 1 ? 'bg-accent-400' : 'bg-fuchsia-400'
                  }`}
                  style={{ originX: "50%", originY: "50%" }}
                />
              ))}
            </motion.div>
          )}
        </motion.div>
      )}

      {/* Task list */}
      <AnimatePresence>
        {tasks.map((task) => (
          <TaskItem
            key={task.id}
            task={task}
            onToggle={onToggle}
            onDelete={onDelete}
          />
        ))}
      </AnimatePresence>
    </div>
  );
};

export default TaskList; 