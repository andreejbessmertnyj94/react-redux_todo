import { createAsyncThunk } from '@reduxjs/toolkit';
import { client } from '../api-client';

export const fetchTasks = createAsyncThunk('tasks/fetchTasks', async () => {
  const response = await client.get('/tasks/list');
  return response.data;
});

export const addNewTask = createAsyncThunk(
  'tasks/addNewTask',
  async (initialTask) => {
    const response = await client.post('/tasks/create', { ...initialTask });
    return response.data;
  }
);

export const updateTask = createAsyncThunk(
  'tasks/updateTask',
  async (update) => {
    const response = await client.patch(`/tasks/${update['id']}/update`, {
      ...update,
    });
    return response.data;
  }
);

export const deleteTask = createAsyncThunk(
  'tasks/deleteTask',
  async (task_id) => {
    const response = await client.delete(`/tasks/${task_id}/delete`);
    return response.data;
  }
);

export const markAllTasksCompleted = createAsyncThunk(
  'tasks/markAllTasksCompleted',
  async () => {
    const response = await client.patch('/tasks/list/update', {
      completed: true,
    });
    return response.data;
  }
);

export const deleteCompletedTasks = createAsyncThunk(
  'tasks/deleteCompletedTasks',
  async () => {
    const response = await client.delete('/tasks/list/delete', {
      completed: true,
    });
    return response.data;
  }
);
