import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Login from './Pages/Login';
import Register from './Pages/Register';
import Logout from './Pages/Logout';
import Main from './Pages/Main';
import NoMatch from './Pages/NoMatch';
import NavBar from './Containers/NavBar';
import { ProvideAuth, PrivateRoute } from './app/auth';

import './App.css';

function App() {
  return (
    <div className="container p-3 app-container">
      <ProvideAuth>
        <Router forceRefresh={true}>
          <NavBar />

          <Switch>
            <PrivateRoute inverse={true} exact path="/register">
              <Register />
            </PrivateRoute>
            <PrivateRoute inverse={true} exact path="/login">
              <Login />
            </PrivateRoute>
            <PrivateRoute exact path="/logout">
              <Logout />
            </PrivateRoute>
            <PrivateRoute exact path="/">
              <Main />
            </PrivateRoute>
            <Route path="*">
              <NoMatch />
            </Route>
          </Switch>
        </Router>
      </ProvideAuth>
    </div>
  );
}

export default App;
