import { createSlice } from '@reduxjs/toolkit';

export const filtersSlice = createSlice({
  name: 'filters',
  initialState: {
    list: [
      { id: 'SHOW_ALL', name: 'All', active: true },
      { id: 'SHOW_TODO', name: 'ToDo', active: false },
      { id: 'SHOW_COMPLETED', name: 'Completed', active: false },
    ],
    currentFilter: 'SHOW_ALL',
  },
  reducers: {
    setCurrent: (state, action) => {
      state.currentFilter = action.payload;
      Object.values(state.list).forEach((filter) => {
        filter.active = filter.id === state.currentFilter;
      });
    },
  },
});

export const { setCurrent } = filtersSlice.actions;

export const selectFiltersList = (state) => state.filters.list;
export const selectCurrentFilter = (state) => state.filters.currentFilter;

export default filtersSlice.reducer;
