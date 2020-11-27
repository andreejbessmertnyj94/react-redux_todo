import { createSlice } from '@reduxjs/toolkit';

export const actionsSlice = createSlice({
  name: 'actions',
  initialState: {
    requestStatus: 'idle',
  },
  reducers: {
    setBusy: (state) => {
      state.requestStatus = 'pending';
    },
    setIdle: (state) => {
      state.requestStatus = 'idle';
    },
  },
});

export const { setBusy, setIdle } = actionsSlice.actions;

export const selectRequestStatus = (state) => state.actions.requestStatus;

export default actionsSlice.reducer;
