import React from 'react';
import { useSelector } from 'react-redux';

import Task from '../../Components/Task';
import { selectCurrentFilter } from '../../app/reducers/filtersSlice';
import { selectTasksByFilter } from '../../app/reducers/tasksSlice';

export default function TasksList() {
  const currentFilter = useSelector(selectCurrentFilter);

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

  const content = tasks.map((task) => <Task key={task.id} task={task} />);

  return <div className="overflow-auto tasks-list">{content}</div>;
};
