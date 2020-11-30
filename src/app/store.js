import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import tasksReducer from './reducers/tasksSlice';
import filtersReducer from './reducers/filtersSlice';
import actionsReducer from './reducers/actionsSlice';

const reducer = combineReducers({
  tasks: tasksReducer,
  filters: filtersReducer,
  actions: actionsReducer,
});

export default createStore(reducer, applyMiddleware(thunk));
