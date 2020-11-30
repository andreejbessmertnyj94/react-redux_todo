import { createStore, combineReducers, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';

import tasksReducer from './reducers/tasksSlice';
import filtersReducer from './reducers/filtersSlice';
import actionsReducer from './reducers/actionsSlice';

const reducer = combineReducers({
  tasks: tasksReducer,
  filters: filtersReducer,
  actions: actionsReducer,
});

export default createStore(
  reducer,
  composeWithDevTools(applyMiddleware(thunk))
);
