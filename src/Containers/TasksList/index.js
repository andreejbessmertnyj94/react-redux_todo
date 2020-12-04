import React, { useEffect, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { unwrapResult } from '@reduxjs/toolkit';

import Task from '../../Components/Task';
import { selectCurrentFilter } from '../../app/reducers/filtersSlice';
import { selectTasksByFilter } from '../../app/reducers/tasksSlice';
import { fetchTasks } from '../../app/reducers/tasksThunks';
import Alert from '../../Components/Alert';
import { selectAlert, setAlert } from '../../app/reducers/actionsSlice';

export default function TasksList() {
  const currentFilter = useSelector(selectCurrentFilter);
  const alert = useSelector(selectAlert);
  const { status: tasksStatus } = useSelector((state) => state.tasks);

  const dispatch = useDispatch();

  useEffect(() => {
    if (tasksStatus === 'idle') {
      (async () => {
        try {
          const resultAction = await dispatch(fetchTasks());
          unwrapResult(resultAction);
        } catch (err) {
          dispatch(
            setAlert({
              message: `Failed to get tasks: ${err.message}`,
              alertType: 'alert-danger',
            })
          );
        }
      })();
    }
  }, [tasksStatus, dispatch]);

  const filterCondition = useMemo(() => {
    switch (currentFilter) {
      case 'SHOW_ALL':
        return null;
      case 'SHOW_TODO':
        return false;
      case 'SHOW_COMPLETED':
        return true;
      default:
        throw new Error('Unknown filter: ' + currentFilter);
    }
  }, [currentFilter]);

  const tasks = useSelector((state) =>
    selectTasksByFilter(state, filterCondition)
  );

  return (
    <div className="overflow-auto tasks-list">
      {tasksStatus === 'loading' && (
        <div className="d-flex justify-content-center">
          <div className="progress w-50">
            <div
              className="progress-bar progress-bar-striped progress-bar-animated bg-secondary w-100"
              role="progressbar"
            >
              Loading...
            </div>
          </div>
        </div>
      )}
      {tasksStatus === 'succeeded' &&
        tasks.map((task) => <Task key={task.id} task={task} />)}
      {tasksStatus === 'failed' && alert && (
        <div className="d-flex justify-content-center">
          <Alert />
        </div>
      )}
    </div>
  );
}
