import { createAsyncThunk } from '@reduxjs/toolkit';
import { client } from '../api-client';

const pathPrefix = 'tasks';

export const fetchTasks = createAsyncThunk(
  `${pathPrefix}/fetchTasks`,
  async () => {
    const response = await client.get(`/${pathPrefix}/list`);
    return response.data;
  }
);

export const addNewTask = createAsyncThunk(
  `${pathPrefix}/addNewTask`,
  async (initialTask) => {
    const response = await client.post(`/${pathPrefix}/create`, {
      ...initialTask,
    });
    return response.data;
  }
);

export const updateTask = createAsyncThunk(
  `${pathPrefix}/updateTask`,
  async (update) => {
    const response = await client.patch(
      `/${pathPrefix}/${update['id']}/update`,
      {
        ...update,
      }
    );
    return response.data;
  }
);

export const deleteTask = createAsyncThunk(
  `${pathPrefix}/deleteTask`,
  async (task_id) => {
    const response = await client.delete(`/${pathPrefix}/${task_id}/delete`);
    return response.data;
  }
);

export const markAllTasksCompleted = createAsyncThunk(
  `${pathPrefix}/markAllTasksCompleted`,
  async () => {
    const response = await client.patch(`/${pathPrefix}/list/update`, {
      completed: true,
    });
    return response.data;
  }
);

export const deleteCompletedTasks = createAsyncThunk(
  `${pathPrefix}/deleteCompletedTasks`,
  async () => {
    const response = await client.delete(`/${pathPrefix}/list/delete`, {
      completed: true,
    });
    return response.data;
  }
);
