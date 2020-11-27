import React from 'react';
import { useSelector } from 'react-redux';
import { selectTasksCount } from '../../app/reducers/tasksSlice';

import TasksToDoCounter from '../../Components/TasksToDoCounter';
import FiltersList from '../FiltersList';
import ClearCompletedButton from '../../Components/ClearCompletedButton';

export default function ControlsPanel() {
  const tasksCount = useSelector(selectTasksCount);

  if (tasksCount === 0) {
    return null;
  }

  return (
    <div className="row justify-content-center mx-0 my-3 flex-nowrap">
      <TasksToDoCounter />
      <FiltersList />
      <ClearCompletedButton />
    </div>
  );
}
