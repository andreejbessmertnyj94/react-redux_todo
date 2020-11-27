import React, { useEffect, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import Task from '../../Components/Task';
import { selectCurrentFilter } from '../../app/reducers/filtersSlice';
import { selectTasksByFilter } from '../../app/reducers/tasksSlice';
import { fetchTasks } from '../../app/reducers/tasksThunks';

export default function TasksList() {
  const dispatch = useDispatch();
  const currentFilter = useSelector(selectCurrentFilter);

  const { status: taskStatus, error } = useSelector((state) => state.tasks);

  useEffect(() => {
    if (taskStatus === 'idle') {
      dispatch(fetchTasks());
    }
  }, [taskStatus, dispatch]);

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
      {taskStatus === 'loading' && (
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
      {taskStatus === 'succeeded' &&
        tasks.map((task) => <Task key={task.id} task={task} />)}
      {taskStatus === 'failed' && <div className="text-center">{error}</div>}
    </div>
  );
}
