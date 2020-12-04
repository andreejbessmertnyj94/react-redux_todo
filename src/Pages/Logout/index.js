import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';

import {
  selectRequestStatus,
  selectAlert,
  setBusy,
  setIdle,
  setAlert,
} from '../../app/reducers/actionsSlice';
import { client, logout } from '../../app/api-client';
import Alert from '../../Components/Alert';

export default function Logout() {
  const [redirect, setRedirect] = useState(undefined);

  const requestStatus = useSelector(selectRequestStatus);
  const alert = useSelector(selectAlert);

  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      if (requestStatus === 'idle' && !redirect) {
        try {
          dispatch(setBusy());
          const response = await client.get('/users/logout');
          logout();
          dispatch(
            setAlert({ message: response.message, alertType: 'alert-success' })
          );
          await new Promise((r) => setTimeout(r, 1000));
          setRedirect(true);
        } catch (err) {
          dispatch(
            setAlert({
              message: `Failed to logout: ${err}`,
              alertType: 'alert-danger',
            })
          );
        } finally {
          dispatch(setIdle());
        }
      }
    })();
  }, [redirect, requestStatus, dispatch]);

  return redirect ? (
    <Redirect to="/login" />
  ) : alert ? (
    <Alert />
  ) : (
    <div className="d-flex justify-content-center">
      <div className="spinner-border" role="status">
        <span className="sr-only">Processing...</span>
      </div>
    </div>
  );
}
