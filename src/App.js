import React from 'react';

import { TasksList } from './components/tasks/TasksList';
import { AddTaskForm } from './components/tasks/AddTaskForm';
import { FiltersList } from './components/tasksFilters/FiltersList';
import { TasksToDoCounter } from './components/tasks/TasksToDoCounter';
import { ClearCompletedButton } from './components/tasks/ClearCompletedButton';

function App() {
  return (
    <div className="container p-3" style={{ maxWidth: '720px' }}>
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
