import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
  selectNumOfTasksToDo,
  selectTasksCount,
} from '../../app/reducers/tasksSlice';
import { markAllTasksCompleted } from '../../app/reducers/tasksThunks';
import { unwrapResult } from '@reduxjs/toolkit';

export default function TasksToDoCounter() {
  const [addRequestStatus, setAddRequestStatus] = useState('idle');

  const numOfTasksToDo = useSelector(selectNumOfTasksToDo);
  const dispatch = useDispatch();

  const tasksCount = useSelector(selectTasksCount);

  if (tasksCount === 0) {
    return null;
  }

  const onMarkAllCompleted = async () => {
    if (addRequestStatus === 'idle') {
      try {
        setAddRequestStatus('pending');
        const resultAction = await dispatch(markAllTasksCompleted());
        unwrapResult(resultAction);
      } catch (err) {
        console.error('Failed to update list: ', err);
      } finally {
        setAddRequestStatus('idle');
      }
    }
  };

  return (
    <button
      type="button"
      onClick={onMarkAllCompleted}
      className="col-3 btn control-buttons"
    >
      {numOfTasksToDo} tasks left
    </button>
  );
}
