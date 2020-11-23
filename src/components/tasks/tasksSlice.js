import {
  createSlice,
  createEntityAdapter,
  createSelector,
} from '@reduxjs/toolkit';

const tasksAdapter = createEntityAdapter();

const initialState = tasksAdapter.getInitialState();

export const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    taskAdded: tasksAdapter.addOne,
    taskStateChanged: tasksAdapter.updateOne,
    taskDeleted: tasksAdapter.removeOne,
    allTasksCompleted(state, action) {
      Object.values(state.entities).forEach((task) => {
        task.completed = true;
      });
    },
    completedTasksDeleted: tasksAdapter.removeMany,
  },
});

export const {
  taskAdded,
  taskStateChanged,
  taskDeleted,
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
