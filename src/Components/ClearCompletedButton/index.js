import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { selectTasksByFilter } from '../../app/reducers/tasksReducer';
import {
  deleteCompletedTasks,
  unwrapAsyncResult,
} from '../../app/reducers/tasksThunks';
import {
  selectRequestStatus,
  setBusy,
  setIdle,
} from '../../app/reducers/actionsReducer';

export default function ClearCompletedButton() {
  const requestStatus = useSelector(selectRequestStatus);

  const completedTasks = useSelector((state) =>
    selectTasksByFilter(state, true)
  );

  const dispatch = useDispatch();

  const display = `${(!completedTasks.length && 'in') || ''}visible`;

  const onClearCompleted = async () => {
    if (requestStatus === 'idle') {
      try {
        dispatch(setBusy());
        const resultAction = await dispatch(deleteCompletedTasks());
        unwrapAsyncResult(resultAction);
      } catch (err) {
        console.error('Failed to delete completed: ', err);
      } finally {
        dispatch(setIdle());
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
