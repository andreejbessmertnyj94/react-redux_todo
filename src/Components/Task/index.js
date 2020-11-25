import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { faCheckCircle } from '@fortawesome/free-regular-svg-icons';
import { faCircle } from '@fortawesome/free-regular-svg-icons';

import { deleteTask, taskStateChanged } from '../../app/reducers/tasksSlice';
import { unwrapResult } from '@reduxjs/toolkit';

export default React.memo(function Task({ task }) {
  const [addRequestStatus, setAddRequestStatus] = useState('idle');

  const dispatch = useDispatch();

  let checkboxIcon, checkboxColor, textLineThrough;

  if (task.completed) {
    checkboxIcon = faCheckCircle;
    checkboxColor = 'green';
    textLineThrough = ' completed';
  } else {
    checkboxIcon = faCircle;
    checkboxColor = 'gray';
    textLineThrough = '';
  }

  const onCheckboxChange = () => {
    dispatch(
      taskStateChanged({
        id: task.id,
        changes: {
          completed: !task.completed,
        },
      })
    );
  };

  const onDeleteTask = async () => {
    if (addRequestStatus === 'idle') {
      try {
        setAddRequestStatus('pending')
        const resultAction = await dispatch(deleteTask(task.id));
        unwrapResult(resultAction);
      } catch (err) {
        console.error('Failed to delete the task: ', err);
      } finally {
        setAddRequestStatus('idle')
      }
    }
  };

  return (
    <div
      className="row justify-content-center mx-0 border-bottom"
      key={task.id}
    >
      <FontAwesomeIcon
        icon={checkboxIcon}
        onClick={onCheckboxChange}
        className="col-2 align-self-center my-3"
        color={checkboxColor}
      />
      <p
        className={
          'col-8 align-self-center py-2 my-2 text-break' + textLineThrough
        }
      >
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
