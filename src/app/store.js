import { createStore, combineReducers, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunkMiddleware from 'redux-thunk';

import tasksReducer from './reducers/tasksReducer';
import filtersReducer from './reducers/filtersReducer';
import actionsReducer from './reducers/actionsReducer';

const reducer = combineReducers({
  tasks: tasksReducer,
  filters: filtersReducer,
  actions: actionsReducer,
});

export default createStore(
  reducer,
  composeWithDevTools(applyMiddleware(thunkMiddleware))
);
