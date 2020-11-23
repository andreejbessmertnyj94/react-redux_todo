import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
  completedTasksDeleted,
  selectTaskIds,
  selectTasksByFilter,
} from './tasksSlice';
import styles from './Tasks.module.css';

export const ClearCompletedButton = () => {
  const completedTasks = useSelector((state) =>
    selectTasksByFilter(state, true)
  );
  const numOfTasksCompleted = completedTasks.length;
  const dispatch = useDispatch();

  if (useSelector(selectTaskIds).length === 0) {
    return null;
  }

  let display = ' visible ';

  if (numOfTasksCompleted === 0) {
    display = ' invisible ';
  }

  const clearCompleted = () => {
    const completedTasksIds = completedTasks.reduce((acc, task) => {
      acc.push(task.id);
      return acc;
    }, []);
    dispatch(completedTasksDeleted(completedTasksIds));
  };

  return (
    <button
      type="button"
      onClick={clearCompleted}
      className={'col-3 btn text-break ' + display + styles['control-buttons']}
    >
      Clear completed
    </button>
  );
};