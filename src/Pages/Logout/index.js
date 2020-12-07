import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
  selectRequestStatus,
  selectAlert,
  setBusy,
  setIdle,
} from '../../app/reducers/actionsSlice';
import Alert from '../../Components/Alert';
import { useAuth } from '../../app/auth';

export default function Logout() {
  const auth = useAuth();

  const requestStatus = useSelector(selectRequestStatus);
  const alert = useSelector(selectAlert);

  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      if (requestStatus === 'idle') {
        dispatch(setBusy());
        await auth.signOut();
        dispatch(setIdle());
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [auth.isAuthenticated]);

  return alert ? (
    <Alert />
  ) : (
    <div className="d-flex justify-content-center">
      <div className="spinner-border" role="status">
        <span className="sr-only">Processing...</span>
      </div>
    </div>
  );
}
