import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
  selectFiltersList,
  setCurrent,
} from '../../app/reducers/filtersReducer';

const Filter = React.memo(function Filter({ filter }) {
  const dispatch = useDispatch();

  const setFilter = () => {
    dispatch(setCurrent(filter.id));
  };

  return (
    <button
      type="button"
      key={filter.id}
      onClick={setFilter}
      className={
        'btn px-2 control-buttons' + (filter.active ? ' active-border' : '')
      }
    >
      {filter.name}
    </button>
  );
});

export default function FiltersList() {
  const filters = useSelector(selectFiltersList);

  return (
    <div className="col-6 d-flex justify-content-center flex-wrap">
      {filters.map((filter) => (
        <Filter key={filter.id} filter={filter} />
      ))}
    </div>
  );
}
