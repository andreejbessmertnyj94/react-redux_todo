import { configureStore } from '@reduxjs/toolkit';

import tasksReducer from './reducers/tasksSlice';
import filtersReducer from './reducers/filtersSlice';

export default configureStore({
  reducer: {
    tasks: tasksReducer,
    filters: filtersReducer,
  },
});
