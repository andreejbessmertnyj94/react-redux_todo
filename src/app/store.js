import { configureStore } from '@reduxjs/toolkit';

import tasksReducer from './reducers/tasksSlice';
import filtersReducer from './reducers/filtersSlice';
import actionsReducer from './reducers/actionsSlice';

export default configureStore({
  reducer: {
    tasks: tasksReducer,
    filters: filtersReducer,
    actions: actionsReducer,
  },
});
