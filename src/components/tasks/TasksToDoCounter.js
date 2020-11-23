import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
  selectNumOfTasksToDo,
  allTasksCompleted,
  selectTasksCount,
} from './tasksSlice';

export const TasksToDoCounter = () => {
  const numOfTasksToDo = useSelector(selectNumOfTasksToDo);
  const dispatch = useDispatch();

  const tasksCount = useSelector(selectTasksCount);

  if (tasksCount === 0) {
    return null;
  }

  const markAllCompleted = () => {
    dispatch(allTasksCompleted());
  };

  return (
    <button
      type="button"
      onClick={markAllCompleted}
      className="col-3 btn control-buttons"
    >
      {numOfTasksToDo} tasks left
    </button>
  );
};
