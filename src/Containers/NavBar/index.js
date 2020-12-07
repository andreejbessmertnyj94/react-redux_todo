import React from 'react';
import { NavLink } from 'react-router-dom';

import { useAuth } from '../../app/auth';

export default function NavBar() {
  const authenticated = useAuth().isAuthenticated;

  return (
    <nav className="navbar navbar-expand navbar-light">
      <ul className="navbar-nav mr-auto">
        <li className="nav-item">
          <NavLink className="nav-link" exact to="/">
            Home
          </NavLink>
        </li>
        {!authenticated && (
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
        {authenticated && (
          <li className="nav-item">
            <NavLink className="nav-link" exact to="/logout">
              Logout
            </NavLink>
          </li>
        )}
      </ul>
    </nav>
  );
}
