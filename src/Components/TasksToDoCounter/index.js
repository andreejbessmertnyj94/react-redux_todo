import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { selectNumOfTasksToDo } from '../../app/reducers/tasksSlice';
import {
  markAllTasksCompleted,
  unwrapAsyncResult,
} from '../../app/reducers/tasksThunks';
import {
  selectRequestStatus,
  setBusy,
  setIdle,
} from '../../app/reducers/actionsSlice';

export default function TasksToDoCounter() {
  const requestStatus = useSelector(selectRequestStatus);

  const numOfTasksToDo = useSelector(selectNumOfTasksToDo);

  const dispatch = useDispatch();

  const onMarkAllCompleted = async () => {
    if (requestStatus === 'idle') {
      try {
        dispatch(setBusy());
        const resultAction = await dispatch(markAllTasksCompleted());
        unwrapAsyncResult(resultAction);
      } catch (err) {
        console.error('Failed to update list: ', err);
      } finally {
        dispatch(setIdle());
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
