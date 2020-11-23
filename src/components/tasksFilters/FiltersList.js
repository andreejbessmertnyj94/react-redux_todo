import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import classNames from 'classnames/bind';

import { selectFiltersList, setCurrent } from './filtersSlice';
import { selectTaskIds } from '../tasks/tasksSlice';
import styles from './Filters.module.css';

export const FiltersList = () => {
  const filters = useSelector(selectFiltersList);
  const dispatch = useDispatch();

  if (useSelector(selectTaskIds).length === 0) {
    return null;
  }

  const setFilter = (e) => {
    dispatch(setCurrent(e.target.id));
  };

  const activeClass = (filter) => {
    return classNames.bind(styles)({
      'control-buttons': true,
      'active-border': filter.active,
    });
  };

  const filterButtons = filters.map((filterItem) => (
    <button
      type="button"
      key={filterItem.id}
      id={filterItem.id}
      onClick={setFilter}
      className={'btn px-2 ' + activeClass(filterItem)}
    >
      {filterItem.name}
    </button>
  ));

  return (
    <div className="col-6 d-flex justify-content-center flex-wrap">
      {filterButtons}
    </div>
  );
};
