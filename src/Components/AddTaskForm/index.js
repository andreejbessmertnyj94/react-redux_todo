import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { unwrapResult } from '@reduxjs/toolkit';

import { addNewTask } from '../../app/reducers/tasksThunks';

export default function AddTaskForm() {
  const [content, setContent] = useState('');
  const [addRequestStatus, setAddRequestStatus] = useState('idle');

  const dispatch = useDispatch();

  const onContentChanged = (e) => setContent(e.target.value);

  const canSave =
    0 < content.length && content.length <= 120 && addRequestStatus === 'idle';

  const onEnterPressed = async (e) => {
    if (e.key === 'Enter' && canSave) {
      try {
        setAddRequestStatus('pending');
        const resultAction = await dispatch(addNewTask({ content }));
        unwrapResult(resultAction);
        setContent('');
      } catch (err) {
        console.error('Failed to save the task: ', err);
      } finally {
        setAddRequestStatus('idle');
      }
    }
  };

  return (
    <div className="row justify-content-center mx-4 mb-3 p-2 border-bottom">
      <input
        type="text"
        placeholder="Enter your task name here"
        value={content}
        onChange={onContentChanged}
        onKeyUp={onEnterPressed}
        className="col border-0"
        maxLength="120"
      />
    </div>
  );
}
