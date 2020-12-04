import React from 'react';
import { useSelector } from 'react-redux';

import { selectAlert } from '../../app/reducers/actionsSlice';

export default function Alert() {
  const { message, alertType } = useSelector(selectAlert);

  return (
    <div className={'alert ' + alertType} role="alert">
      {message}
    </div>
  );
}
