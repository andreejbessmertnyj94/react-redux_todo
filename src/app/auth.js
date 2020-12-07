import React, { createContext, useContext, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Redirect, Route } from 'react-router-dom';

import { client } from './api-client';
import { setAlert } from './reducers/actionsSlice';

/** For more details on
 * `authContext`, `ProvideAuth`, `useAuth` and `useProvideAuth`
 * refer to: https://usehooks.com/useAuth/
 */

const authContext = createContext();
export const localStorageKey = 'auth_token';

export function ProvideAuth({ children }) {
  const auth = useProvideAuth();
  return <authContext.Provider value={auth}>{children}</authContext.Provider>;
}

export const useAuth = () => {
  return useContext(authContext);
};

function useProvideAuth() {
  const token = window.localStorage.getItem(localStorageKey);

  const dispatch = useDispatch();

  const [isAuthenticated, setIsAuthenticated] = useState(!!token);

  const signIn = async (username, password) => {
    try {
      const response = await client.post('/users/login', {
        username,
        password,
      });
      localStorage.setItem(localStorageKey, response.data.token);
      dispatch(
        setAlert({ message: response.message, alertType: 'alert-success' })
      );
      await new Promise((r) => setTimeout(r, 2000));
      setIsAuthenticated(true);
    } catch (err) {
      dispatch(
        setAlert({
          message: `Failed to login: ${err}`,
          alertType: 'alert-danger',
        })
      );
    }
  };

  const signOut = async () => {
    try {
      const response = await client.get('/users/logout');
      localStorage.removeItem(localStorageKey);
      dispatch(
        setAlert({ message: response.message, alertType: 'alert-success' })
      );
      await new Promise((r) => setTimeout(r, 1000));
      setIsAuthenticated(false);
    } catch (err) {
      dispatch(
        setAlert({
          message: `Failed to logout: ${err}`,
          alertType: 'alert-danger',
        })
      );
    }
  };

  const signUp = async (username, password, history) => {
    try {
      const response = await client.post('/users/register', {
        username,
        password,
      });
      dispatch(
        setAlert({ message: response.message, alertType: 'alert-success' })
      );
      await new Promise((r) => setTimeout(r, 1000));
      history.push('/login');
    } catch (err) {
      dispatch(
        setAlert({
          message: `Failed to register: ${err}`,
          alertType: 'alert-danger',
        })
      );
    }
  };

  return {
    isAuthenticated,
    signIn,
    signUp,
    signOut,
  };
}

export function PrivateRoute({ children, inv = false, ...rest }) {
  /**                 |  private  |  inverse private
   * authenticated     |   child   |     "/"
   * not authenticated | "/login"  |    child
   */
  const auth = useAuth();
  return (
    <Route
      {...rest}
      render={({ location }) =>
        auth.isAuthenticated === !inv ? (
          children
        ) : inv ? (
          <Redirect to="/" />
        ) : (
          <Redirect
            to={{
              pathname: '/login',
              state: { from: location },
            }}
          />
        )
      }
    />
  );
}
