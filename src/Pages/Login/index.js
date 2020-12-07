import React, { useCallback, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
  selectRequestStatus,
  selectAlert,
  setBusy,
  setIdle,
} from '../../app/reducers/actionsSlice';
import Alert from '../../Components/Alert';
import { useAuth } from '../../app/auth';

export default function Login() {
  const [fields, setFields] = useState({ username: '', password: '' });

  const auth = useAuth();

  const requestStatus = useSelector(selectRequestStatus);
  const alert = useSelector(selectAlert);

  const dispatch = useDispatch();

  const onUsernameChanged = useCallback(
    (e) => setFields({ username: e.target.value, password: fields.password }),
    [fields.password]
  );

  const onPasswordChanged = useCallback(
    (e) => setFields({ password: e.target.value, username: fields.username }),
    [fields.username]
  );

  const canSave = useMemo(
    () =>
      0 < fields.username.length &&
      0 < fields.password.length &&
      requestStatus === 'idle',
    [fields, requestStatus]
  );

  const onFormSubmit = async (e) => {
    e.preventDefault();
    if (canSave) {
      dispatch(setBusy());
      await auth.signIn(fields.username, fields.password);
      dispatch(setIdle());
    }
  };

  return (
    <form onSubmit={onFormSubmit}>
      {alert && <Alert />}
      <div className="form-group">
        <label htmlFor="inputUsername">Username</label>
        <input
          type="username"
          value={fields.username}
          onChange={onUsernameChanged}
          className="form-control"
          id="inputUsername"
        />
      </div>
      <div className="form-group">
        <label htmlFor="inputPassword">Password</label>
        <input
          type="password"
          value={fields.password}
          onChange={onPasswordChanged}
          className="form-control"
          id="inputPassword"
        />
      </div>
      <button type="submit" className="btn btn-secondary" disabled={!canSave}>
        Login
      </button>
    </form>
  );
}
