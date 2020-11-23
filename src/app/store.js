import { configureStore } from '@reduxjs/toolkit';

import tasksReducer from '../components/tasks/tasksSlice';
import filtersReducer from '../components/tasksFilters/filtersSlice';

const persistedState = localStorage.getItem('reduxState')
  ? JSON.parse(localStorage.getItem('reduxState'))
  : {};

export default configureStore({
  reducer: {
    tasks: tasksReducer,
    filters: filtersReducer,
  },
  preloadedState: persistedState,
});
