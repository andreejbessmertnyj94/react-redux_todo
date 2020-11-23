import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { selectFiltersList, setCurrent } from './filtersSlice';
import { selectTasksCount } from '../tasks/tasksSlice';

export const FiltersList = () => {
  const filters = useSelector(selectFiltersList);
  const dispatch = useDispatch();

  const tasksCount = useSelector(selectTasksCount);

  if (tasksCount === 0) {
    return null;
  }

  const setFilter = (id) => {
    dispatch(setCurrent(id));
  };

  const activeClass = (active) => (active ? ' active-border' : '');

  return (
    <div className="col-6 d-flex justify-content-center flex-wrap">
      {filters.map((filterItem) => (
        <button
          type="button"
          key={filterItem.id}
          onClick={() => setFilter(filterItem.id)}
          className={
            'btn px-2 control-buttons' + activeClass(filterItem.active)
          }
        >
          {filterItem.name}
        </button>
      ))}
    </div>
  );
};
