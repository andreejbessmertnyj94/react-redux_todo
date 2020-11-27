import React from 'react';

import TasksList from './Containers/TasksList';
import AddTaskForm from './Components/AddTaskForm';
import ControlsPanel from './Containers/ControlsPanel';

import './App.css';

function App() {
  return (
    <div className="container p-3 app-container">
      <h2 className="text-center">Your todo list</h2>
      <div className="container mt-4 px-0 pt-4 pb-2 shadow rounded border">
        <AddTaskForm />
        <TasksList />
        <ControlsPanel />
      </div>
    </div>
  );
}

export default App;
