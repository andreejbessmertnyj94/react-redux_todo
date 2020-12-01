import produce from 'immer';

const initialState = {
  ids: [],
  entities: {},
  status: 'idle',
  error: null,
};

function modifyPayload(payload) {
  // change mongodb ids to redux ids format
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

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case 'tasks/fetchTasks/pending':
      return produce(state, (draftState) => {
        draftState.status = 'loading';
      });
    case 'tasks/fetchTasks/fulfilled':
      return produce(state, (draftState) => {
        draftState.status = 'succeeded';
        modifyPayload(action.payload).forEach((task) => {
          draftState.ids.push(task.id);
          draftState.entities[task.id] = {
            completed: task.completed,
            content: task.content,
            id: task.id,
          };
        });
      });
    case 'tasks/fetchTasks/rejected':
      return produce(state, (draftState) => {
        draftState.status = 'failed';
        draftState.error = action.error.message;
      });
    case 'tasks/addNewTask/fulfilled':
      return produce(state, (draftState) => {
        modifyPayload(action.payload).forEach((task) => {
          draftState.ids.push(task.id);
          draftState.entities[task.id] = {
            completed: task.completed,
            content: task.content,
            id: task.id,
          };
        });
      });
    case 'tasks/updateTask/fulfilled':
      return produce(state, (draftState) => {
        modifyPayload(action.payload).forEach((task) => {
          draftState.entities[task.id] = {
            completed: task.completed,
            content: task.content,
            id: task.id,
          };
        });
      });
    case 'tasks/deleteTask/fulfilled':
      return produce(state, (draftState) => {
        const taskId = action.payload[0]['_id'];
        draftState.ids = draftState.ids.filter((id) => id !== taskId);
        delete draftState.entities[taskId];
      });
    case 'tasks/markAllTasksCompleted/fulfilled':
      return produce(state, (draftState) => {
        Object.values(draftState.entities).forEach((task) => {
          task.completed = true;
        });
      });
    case 'tasks/deleteCompletedTasks/fulfilled':
      return produce(state, (draftState) => {
        const idsToDelete = Object.values(state.entities).reduce(
          (acc, task) => {
            if (task.completed === true) {
              acc.push(task.id);
            }
            return acc;
          },
          []
        );
        idsToDelete.forEach((taskId) => {
          draftState.ids = draftState.ids.filter((id) => id !== taskId);
          delete draftState.entities[taskId];
        });
      });
    default:
      return state;
  }
}

export const selectTasksCount = (state) => state.tasks.ids.length;
export const selectTasksByFilter = (state, tasksFilter) => {
  const tasks = Object.values(state.tasks.entities);

  return tasksFilter === null
    ? tasks
    : tasks.filter((task) => task.completed === tasksFilter);
};
export const selectNumOfTasksToDo = (state) =>
  Object.values(state.tasks.entities).filter((task) => !task.completed).length;
