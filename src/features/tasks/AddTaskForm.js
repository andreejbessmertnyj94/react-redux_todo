import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { nanoid } from '@reduxjs/toolkit'

import { taskAdded } from './tasksSlice'

export const AddTaskForm = () => {
  const [content, setContent] = useState('')

  const dispatch = useDispatch()

  const onContentChanged = (e) => setContent(e.target.value)

  const onEnterPressed = (e) => {
    if (e.key === 'Enter' && content) {
      dispatch(
        taskAdded({
          id: nanoid(),
          content,
          completed: false,
        })
      )

      setContent('')
    }
  }

  return (
    <div className="row justify-content-center mx-4 mb-3 p-2 border-bottom">
      <input
        type="text"
        placeholder="Enter your task name here"
        value={content}
        onChange={onContentChanged}
        onKeyUp={onEnterPressed}
        className="col border-0"
      />
    </div>
  )
}
