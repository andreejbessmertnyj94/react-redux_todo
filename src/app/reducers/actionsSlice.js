import { createSlice } from '@reduxjs/toolkit';

export const actionsSlice = createSlice({
  name: 'actions',
  initialState: {
    requestStatus: 'idle',
    alert: undefined,
  },
  reducers: {
    setBusy: (state) => {
      state.requestStatus = 'pending';
    },
    setIdle: (state) => {
      state.requestStatus = 'idle';
    },
    setAlert: (state, action) => {
      state.alert = { ...action.payload };
    },
  },
});

export const { setBusy, setIdle, setAlert } = actionsSlice.actions;

export const selectRequestStatus = (state) => state.actions.requestStatus;

export const selectAlert = (state) => state.actions.alert;

export default actionsSlice.reducer;
