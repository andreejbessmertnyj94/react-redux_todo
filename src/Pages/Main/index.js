import React from 'react';

import AddTaskForm from '../../Components/AddTaskForm';
import TasksList from '../../Containers/TasksList';
import ControlsPanel from '../../Containers/ControlsPanel';

export default function Main() {
  return (
    <>
      <h2 className="text-center">Your todo list</h2>
      <div className="container mt-4 px-0 pt-4 pb-2 shadow rounded border">
        <AddTaskForm />
        <TasksList />
        <ControlsPanel />
      </div>
    </>
  );
}
