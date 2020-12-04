import React, { useCallback, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
  selectRequestStatus,
  selectAlert,
  setBusy,
  setIdle,
  setAlert,
} from '../../app/reducers/actionsSlice';
import { client } from '../../app/api-client';
import Alert from '../../Components/Alert';

export default function Register() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const requestStatus = useSelector(selectRequestStatus);
  const alert = useSelector(selectAlert);

  const dispatch = useDispatch();

  const onUsernameChanged = useCallback((e) => setUsername(e.target.value), [
    setUsername,
  ]);

  const onPasswordChanged = useCallback((e) => setPassword(e.target.value), [
    setPassword,
  ]);

  const canSave = useMemo(
    () =>
      0 < username.length && 0 < password.length && requestStatus === 'idle',
    [username, password, requestStatus]
  );

  const onFormSubmit = async (e) => {
    e.preventDefault();
    if (canSave) {
      try {
        dispatch(setBusy());
        const response = await client.post('/users/register', {
          username,
          password,
        });
        setUsername('');
        setPassword('');
        dispatch(
          setAlert({ message: response.message, alertType: 'alert-success' })
        );
      } catch (err) {
        dispatch(
          setAlert({
            message: `Failed to register: ${err}`,
            alertType: 'alert-danger',
          })
        );
      } finally {
        dispatch(setIdle());
      }
    }
  };

  return (
    <form onSubmit={onFormSubmit}>
      {alert && <Alert />}
      <div className="form-group">
        <label htmlFor="inputUsername">Username</label>
        <input
          type="username"
          value={username}
          onChange={onUsernameChanged}
          className="form-control"
          id="inputUsername"
        />
      </div>
      <div className="form-group">
        <label htmlFor="inputPassword">Password</label>
        <input
          type="password"
          value={password}
          onChange={onPasswordChanged}
          className="form-control"
          id="inputPassword"
        />
      </div>
      <button type="submit" className="btn btn-secondary" disabled={!canSave}>
        Register
      </button>
    </form>
  );
}
