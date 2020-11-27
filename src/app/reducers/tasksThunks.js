import { createAsyncThunk } from '@reduxjs/toolkit';
import { client } from '../api-client';

export const fetchTasks = createAsyncThunk('tasks/fetchTasks', () => {
  return client.get('/tasks/list');
});

export const addNewTask = createAsyncThunk(
  'tasks/addNewTask',
  (initialTask) => {
    return client.post('/tasks/create', { ...initialTask });
  }
);

export const updateTask = createAsyncThunk('tasks/updateTask', (update) => {
  return client.patch(`/tasks/${update['id']}/update`, { ...update });
});

export const deleteTask = createAsyncThunk('tasks/deleteTask', (task_id) => {
  return client.delete(`/tasks/${task_id}/delete`);
});

export const markAllTasksCompleted = createAsyncThunk(
  'tasks/markAllTasksCompleted',
  () => {
    return client.patch('/tasks/list/update', { completed: true });
  }
);

export const deleteCompletedTasks = createAsyncThunk(
  'tasks/deleteCompletedTasks',
  () => {
    return client.delete('/tasks/list/delete', { completed: true });
  }
);
