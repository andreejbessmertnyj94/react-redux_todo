import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

import {
  selectNumOfTasksToDo,
  allTasksCompleted,
  selectTaskIds,
} from './tasksSlice'
import styles from './Tasks.module.css'

export const TasksToDoCounter = () => {
  const numOfTasksToDo = useSelector(selectNumOfTasksToDo)
  const dispatch = useDispatch()

  if (useSelector(selectTaskIds).length === 0) {
    return null
  }

  const markAllCompleted = () => {
    dispatch(allTasksCompleted())
  }

  return (
    <button
      type="button"
      onClick={markAllCompleted}
      className={'col-3 btn ' + styles['control-buttons']}
    >
      {numOfTasksToDo} tasks left
    </button>
  )
}
