import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import Task from '../../Components/Task';
import { selectCurrentFilter } from '../../app/reducers/filtersSlice';
import { selectTasksByFilter } from '../../app/reducers/tasksSlice';
import { fetchTasks } from '../../app/reducers/tasksThunks';

export default function TasksList() {
  const dispatch = useDispatch();
  const currentFilter = useSelector(selectCurrentFilter);

  const taskStatus = useSelector((state) => state.tasks.status);
  const error = useSelector((state) => state.tasks.error);

  useEffect(() => {
    if (taskStatus === 'idle') {
      dispatch(fetchTasks());
    }
  }, [taskStatus, dispatch]);

  let filterCondition;

  switch (currentFilter) {
    case 'SHOW_ALL':
      filterCondition = null;
      break;
    case 'SHOW_TODO':
      filterCondition = false;
      break;
    case 'SHOW_COMPLETED':
      filterCondition = true;
      break;
    default:
      throw new Error('Unknown filter: ' + currentFilter);
  }

  const tasks = useSelector((state) =>
    selectTasksByFilter(state, filterCondition)
  );

  let content;

  if (taskStatus === 'loading') {
    content = (
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
    );
  } else if (taskStatus === 'succeeded') {
    content = tasks.map((task) => <Task key={task.id} task={task} />);
  } else if (taskStatus === 'failed') {
    content = <div className="text-center">{error}</div>;
  }

  return <div className="overflow-auto tasks-list">{content}</div>;
}
