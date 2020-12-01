import React, { useCallback, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { addNewTask, unwrapAsyncResult } from '../../app/reducers/tasksThunks';
import {
  selectRequestStatus,
  setBusy,
  setIdle,
} from '../../app/reducers/actionsSlice';

export default function AddTaskForm() {
  const [content, setContent] = useState('');
  const requestStatus = useSelector(selectRequestStatus);

  const dispatch = useDispatch();

  const onContentChanged = useCallback((e) => setContent(e.target.value), [
    setContent,
  ]);

  const canSave = useMemo(
    () =>
      0 < content.length && content.length <= 120 && requestStatus === 'idle',
    [content, requestStatus]
  );

  const onEnterPressed = async (e) => {
    if (e.key === 'Enter' && canSave) {
      try {
        dispatch(setBusy());
        const resultAction = await dispatch(addNewTask({ content }));
        unwrapAsyncResult(resultAction);
        setContent('');
      } catch (err) {
        console.error('Failed to save the task: ', err);
      } finally {
        dispatch(setIdle());
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
