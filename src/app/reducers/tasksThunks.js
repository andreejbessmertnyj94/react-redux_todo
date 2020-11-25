import { createAsyncThunk } from '@reduxjs/toolkit';
import { client } from '../api-client';

export const fetchTasks = createAsyncThunk('tasks/fetchTasks', async () => {
  return await client.get('/tasks/list');
});

export const addNewTask = createAsyncThunk(
  'tasks/addNewTask',
  async (initialTask) => {
    return await client.post('/tasks/create', { ...initialTask });
  }
);

export const updateTask = createAsyncThunk(
  'tasks/updateTask',
  async (update) => {
    return await client.patch(`/tasks/${update['id']}/update`, { ...update });
  }
);

export const deleteTask = createAsyncThunk(
  'tasks/deleteTask',
  async (task_id) => {
    return await client.delete(`/tasks/${task_id}/delete`);
  }
);

export const markAllTasksCompleted = createAsyncThunk(
  'tasks/markAllTasksCompleted',
  async () => {
    return await client.patch('/tasks/list/update', { completed: true });
  }
);

export const deleteCompletedTasks = createAsyncThunk(
  'tasks/deleteCompletedTasks',
  async () => {
    return await client.delete('/tasks/list/delete', { completed: true });
  }
);
