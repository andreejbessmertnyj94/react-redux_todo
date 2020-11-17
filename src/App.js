import React from 'react'

import { TasksList } from './features/tasks/TasksList'
import { AddTaskForm } from './features/tasks/AddTaskForm'
import { FiltersList } from './features/tasksFilters/FiltersList'
import { TasksToDoCounter } from './features/tasks/TasksToDoCounter'
import { ClearCompletedButton } from './features/tasks/ClearCompletedButton'

function App() {
  return (
    <div className="container p-3" style={{ maxWidth: '720px' }}>
      <h2 className="text-center">Your todo list</h2>
      <div className="container mt-4 px-0 pt-4 pb-2 shadow rounded border">
        <AddTaskForm />
        <TasksList />
        <div className="row justify-content-center mx-0 my-3 flex-nowrap">
          <TasksToDoCounter />
          <FiltersList />
          <ClearCompletedButton />
        </div>
      </div>
    </div>
  )
}

export default App
