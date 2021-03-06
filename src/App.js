import React from 'react';

import TasksList from './Containers/TasksList';
import AddTaskForm from './Components/AddTaskForm';
import FiltersList from './Containers/FiltersList';
import TasksToDoCounter from './Components/TasksToDoCounter';
import ClearCompletedButton from './Components/ClearCompletedButton';

import './App.css';

function App() {
  return (
    <div className="container p-3 app-container">
      <h2 className="text-center">Your todo list</h2>
      <div className="container mt-4 px-0 pt-4 pb-2 shadow rounded border">
        <AddTaskForm />
        <TasksList />
        <div className="row justify-content-center mx-0 my-3 flex-nowrap">
          <TasksToDoCounter />
          <FiltersList />
          <ClearCompletedButton />
        </div>
      </div>
    </div>
  );
}

export default App;
