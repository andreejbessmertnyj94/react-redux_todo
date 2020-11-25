import {
  createEntityAdapter,
  createSelector,
  createSlice,
} from '@reduxjs/toolkit';
import * as thunks from './tasksThunks';

const tasksAdapter = createEntityAdapter();

const initialState = tasksAdapter.getInitialState({
  status: 'idle',
  error: null,
});

function modifyPayload(payload) {
  // change mongodb ids to redux ids format
  if (!Array.isArray(payload)) {
    payload = [payload];
  }
  return payload.map((obj) => {
    Object.defineProperty(
      obj,
      'id',
      Object.getOwnPropertyDescriptor(obj, '_id')
    );
    delete obj['_id'];
    return obj;
  });
}

export const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {},
  extraReducers: {
    [thunks.fetchTasks.pending]: (state, action) => {
      state.status = 'loading';
    },
    [thunks.fetchTasks.fulfilled]: (state, action) => {
      state.status = 'succeeded';
      tasksAdapter.upsertMany(state, modifyPayload(action.payload));
    },
    [thunks.fetchTasks.rejected]: (state, action) => {
      state.status = 'failed';
      state.error = action.error.message;
    },
    [thunks.addNewTask.fulfilled]: (state, action) => {
      tasksAdapter.addMany(state, modifyPayload(action.payload));
    },
    [thunks.updateTask.fulfilled]: (state, action) => {
      tasksAdapter.upsertMany(state, modifyPayload(action.payload));
    },
    [thunks.deleteTask.fulfilled]: (state, action) => {
      tasksAdapter.removeOne(state, action.payload['_id']);
    },
    [thunks.markAllTasksCompleted.fulfilled]: (state, action) => {
      Object.values(state.entities).forEach((task) => {
        task.completed = true;
      });
    },
    [thunks.deleteCompletedTasks.fulfilled]: (state, action) => {
      const idsToDelete = Object.values(state.entities).reduce((acc, task) => {
        if (task.completed === true) {
          acc.push(task.id);
        }
        return acc;
      }, []);
      tasksAdapter.removeMany(state, idsToDelete);
    },
  },
});

// export const {} = tasksSlice.actions;

export default tasksSlice.reducer;

export const {
  selectAll: selectAllTasks,
  selectTotal: selectTasksCount,
} = tasksAdapter.getSelectors((state) => state.tasks);

export const selectTasksByFilter = createSelector(
  [selectAllTasks, (state, tasksFilter) => tasksFilter],
  (tasks, tasksFilter) =>
    tasksFilter === null
      ? tasks
      : tasks.filter((task) => task.completed === tasksFilter)
);

export const selectNumOfTasksToDo = createSelector(
  selectAllTasks,
  (tasks) => tasks.filter((task) => !task.completed).length
);
