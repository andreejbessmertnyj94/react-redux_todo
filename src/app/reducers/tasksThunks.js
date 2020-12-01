import { client } from '../api-client';

function asyncThunkDecorator(actionPrefix, req) {
  return async function (dispatch, getState) {
    dispatch({ type: `${actionPrefix}/pending` });
    try {
      const response = await req;
      const resultAction = {
        type: `${actionPrefix}/fulfilled`,
        payload: response.data,
      };
      dispatch(resultAction);
      return resultAction;
    } catch (err) {
      const resultAction = {
        type: `${actionPrefix}/rejected`,
        payload: undefined,
        error: { message: err },
      };
      dispatch(resultAction);
      return resultAction;
    }
  };
}

export const unwrapAsyncResult = (resultAction) => {
  if (resultAction.error) {
    throw new Error(resultAction.error.message);
  }
  return resultAction.payload;
};

export const fetchTasks = () =>
  asyncThunkDecorator('tasks/fetchTasks', client.get('/tasks/list'));

export const addNewTask = (initialTask) =>
  asyncThunkDecorator(
    'tasks/addNewTask',
    client.post('/tasks/create', { ...initialTask })
  );

export const updateTask = (update) =>
  asyncThunkDecorator(
    'tasks/updateTask',
    client.patch(`/tasks/${update['id']}/update`, {
      ...update,
    })
  );

export const deleteTask = (task_id) =>
  asyncThunkDecorator(
    'tasks/deleteTask',
    client.delete(`/tasks/${task_id}/delete`)
  );

export const markAllTasksCompleted = () =>
  asyncThunkDecorator(
    'tasks/markAllTasksCompleted',
    client.patch('/tasks/list/update', {
      completed: true,
    })
  );

export const deleteCompletedTasks = () =>
  asyncThunkDecorator(
    'tasks/deleteCompletedTasks',
    client.delete('/tasks/list/delete', {
      completed: true,
    })
  );
