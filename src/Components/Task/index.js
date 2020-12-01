import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { faCheckCircle } from '@fortawesome/free-regular-svg-icons';
import { faCircle } from '@fortawesome/free-regular-svg-icons';

import {
  deleteTask,
  updateTask,
  unwrapAsyncResult,
} from '../../app/reducers/tasksThunks';
import {
  selectRequestStatus,
  setBusy,
  setIdle,
} from '../../app/reducers/actionsSlice';

export default React.memo(function Task({ task }) {
  const requestStatus = useSelector(selectRequestStatus);

  const dispatch = useDispatch();

  const onCheckboxChange = async () => {
    if (requestStatus === 'idle') {
      try {
        dispatch(setBusy());
        const resultAction = await dispatch(
          updateTask({ id: task.id, completed: !task.completed })
        );
        unwrapAsyncResult(resultAction);
      } catch (err) {
        console.error('Failed to update the task: ', err);
      } finally {
        dispatch(setIdle());
      }
    }
  };

  const onDeleteTask = async () => {
    if (requestStatus === 'idle') {
      try {
        dispatch(setBusy());
        const resultAction = await dispatch(deleteTask(task.id));
        unwrapAsyncResult(resultAction);
      } catch (err) {
        console.error('Failed to delete the task: ', err);
      } finally {
        dispatch(setIdle());
      }
    }
  };

  return (
    <div
      className={
        'row justify-content-center mx-0 border-bottom' +
        (task.completed ? ' completed' : '')
      }
      key={task.id}
    >
      <FontAwesomeIcon
        icon={task.completed ? faCheckCircle : faCircle}
        onClick={onCheckboxChange}
        className="col-2 align-self-center my-3 checkboxIcon"
      />
      <p className="col-8 align-self-center py-2 my-2 text-break">
        {task.content}
      </p>
      <FontAwesomeIcon
        icon={faTrashAlt}
        onClick={onDeleteTask}
        className="col-2 align-self-center my-3 trash-button"
      />
    </div>
  );
});
