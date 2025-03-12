# Task Manager App

A modern Task Manager application built with React, TypeScript, and Tailwind CSS.

## Features

- View a list of tasks with their completion status
- Add new tasks
- Mark tasks as completed with a visual indicator
- Delete tasks
- Progress tracking with a visual progress bar
- Local storage persistence for tasks
- Animations for task additions, deletions, and completions
- Celebration animation when all tasks are completed

## Technologies Used

- **React**: For building the user interface
- **TypeScript**: For type safety and better developer experience
- **Tailwind CSS**: For styling
- **Framer Motion**: For animations
- **Local Storage API**: For data persistence

## Project Structure

- `src/components`: React components
  - `AddTaskForm.tsx`: Component for adding new tasks
  - `TaskItem.tsx`: Component for displaying individual tasks
  - `TaskList.tsx`: Component for displaying the list of tasks
- `src/hooks`: Custom React hooks
  - `useTasks.ts`: Hook for managing tasks with local storage persistence
- `src/types`: TypeScript interfaces
  - `Task.ts`: Interface for the Task model

## Setup Instructions

1. Clone the repository:
   ```
   git clone <repository-url>
   cd task-manager
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Start the development server:
   ```
   npm start
   ```

4. Open your browser and navigate to:
   ```
   http://localhost:3000
   ```

## How It Works

1. The app fetches initial tasks from the JSONPlaceholder API
2. Tasks are stored in local storage for persistence
3. Users can add, toggle, and delete tasks
4. All changes are immediately reflected in the UI and saved to local storage
5. When all tasks are completed, a celebration animation appears

## License

MIT

