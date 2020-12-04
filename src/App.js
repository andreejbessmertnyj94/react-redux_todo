import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  NavLink,
} from 'react-router-dom';

import TasksList from './Containers/TasksList';
import AddTaskForm from './Components/AddTaskForm';
import ControlsPanel from './Containers/ControlsPanel';
import Login from './Pages/Login';
import Register from './Pages/Register';
import Logout from './Pages/Logout';
import { localStorageKey } from './app/api-client';

import './App.css';

function App() {
  const token = window.localStorage.getItem(localStorageKey);

  return (
    <Router forceRefresh={true}>
      <div className="container p-3 app-container">
        <nav className="navbar navbar-expand navbar-light">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item">
              <NavLink className="nav-link" exact to="/">
                Home
              </NavLink>
            </li>
            {!token && (
              <>
                <li className="nav-item">
                  <NavLink className="nav-link" exact to="/register">
                    Register
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" exact to="/login">
                    Login
                  </NavLink>
                </li>
              </>
            )}
            {token && (
              <li className="nav-item">
                <NavLink className="nav-link" exact to="/logout">
                  Logout
                </NavLink>
              </li>
            )}
          </ul>
        </nav>

        <Switch>
          <Route exact path="/register">
            <Register />
          </Route>
          <Route exact path="/login">
            <Login />
          </Route>
          <Route exact path="/logout">
            <Logout />
          </Route>
          <Route exact path="/">
            <div className="container p-3 app-container">
              <h2 className="text-center">Your todo list</h2>
              <div className="container mt-4 px-0 pt-4 pb-2 shadow rounded border">
                <AddTaskForm />
                <TasksList />
                <ControlsPanel />
              </div>
            </div>
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
