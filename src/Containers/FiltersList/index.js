import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { selectFiltersList, setCurrent } from '../../app/reducers/filtersSlice';
import { selectTasksCount } from '../../app/reducers/tasksSlice';

const Filter = ({ filter }) => {
  const dispatch = useDispatch();
  const activeClass = filter.active ? ' active-border' : '';

  const setFilter = () => {
    dispatch(setCurrent(filter.id));
  };

  return (
    <button
      type="button"
      key={filter.id}
      onClick={setFilter}
      className={'btn px-2 control-buttons' + activeClass}
    >
      {filter.name}
    </button>
  );
};

export default function FiltersList() {
  const filters = useSelector(selectFiltersList);

  const tasksCount = useSelector(selectTasksCount);

  if (tasksCount === 0) {
    return null;
  }

  const renderedFilters = filters.map((filter) => (
    <Filter key={filter.id} filter={filter} />
  ));

  return (
    <div className="col-6 d-flex justify-content-center flex-wrap">
      {renderedFilters}
    </div>
  );
};
