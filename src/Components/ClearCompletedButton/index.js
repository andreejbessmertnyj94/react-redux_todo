import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
  selectTasksByFilter,
  selectTasksCount,
} from '../../app/reducers/tasksSlice';
import { deleteCompletedTasks } from '../../app/reducers/tasksThunks';
import { unwrapResult } from '@reduxjs/toolkit';

export default function ClearCompletedButton() {
  const [addRequestStatus, setAddRequestStatus] = useState('idle');

  const completedTasks = useSelector((state) =>
    selectTasksByFilter(state, true)
  );
  const numOfTasksCompleted = completedTasks.length;
  const dispatch = useDispatch();

  const tasksCount = useSelector(selectTasksCount);

  if (tasksCount === 0) {
    return null;
  }

  let display = ' visible';

  if (numOfTasksCompleted === 0) {
    display = ' invisible';
  }

  const onClearCompleted = async () => {
    if (addRequestStatus === 'idle') {
      try {
        setAddRequestStatus('pending');
        const resultAction = await dispatch(deleteCompletedTasks());
        unwrapResult(resultAction);
      } catch (err) {
        console.error('Failed to delete completed: ', err);
      } finally {
        setAddRequestStatus('idle');
      }
    }
  };

  return (
    <button
      type="button"
      onClick={onClearCompleted}
      className={'col-3 btn text-break control-buttons ' + display}
    >
      Clear completed
    </button>
  );
}
