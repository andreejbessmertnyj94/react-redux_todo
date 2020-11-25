import {
  createAsyncThunk,
  createEntityAdapter,
  createSelector,
  createSlice,
} from '@reduxjs/toolkit';
import { client } from '../api-client';

const tasksAdapter = createEntityAdapter();

const initialState = tasksAdapter.getInitialState({
  status: 'idle',
  error: null,
});

export const fetchTasks = createAsyncThunk('tasks/fetchTasks', async () => {
  return await client.get('/tasks/list');
});

export const addNewTask = createAsyncThunk(
  'tasks/addNewTask',
  async (initialTask) => {
    return await client.post('/tasks/create', { ...initialTask });
  }
);

export const deleteTask = createAsyncThunk(
  'tasks/deleteTask',
  async (task_id) => {
    return await client.delete(`/tasks/${task_id}/delete`);
  }
);

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
  reducers: {
    taskStateChanged: tasksAdapter.updateOne,
    allTasksCompleted(state, action) {
      Object.values(state.entities).forEach((task) => {
        task.completed = true;
      });
    },
    completedTasksDeleted: tasksAdapter.removeMany,
  },
  extraReducers: {
    [fetchTasks.pending]: (state, action) => {
      state.status = 'loading';
    },
    [fetchTasks.fulfilled]: (state, action) => {
      state.status = 'succeeded';
      tasksAdapter.upsertMany(state, modifyPayload(action.payload));
    },
    [fetchTasks.rejected]: (state, action) => {
      state.status = 'failed';
      state.error = action.error.message;
    },
    [addNewTask.fulfilled]: (state, action) => {
      tasksAdapter.addMany(state, modifyPayload(action.payload));
    },
    [deleteTask.fulfilled]: (state, action) => {
      tasksAdapter.removeOne(state, action.payload['_id']);
    },
  },
});

export const {
  taskStateChanged,
  allTasksCompleted,
  completedTasksDeleted,
} = tasksSlice.actions;

export default tasksSlice.reducer;

export const {
  selectAll: selectAllTasks,
  selectById: selectTaskById,
  selectIds: selectTaskIds,
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
