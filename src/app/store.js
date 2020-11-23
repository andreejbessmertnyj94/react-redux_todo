import { configureStore } from '@reduxjs/toolkit';

import tasksReducer from './reducers/tasksSlice';
import filtersReducer from './reducers/filtersSlice';

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
