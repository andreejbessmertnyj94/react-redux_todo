import produce from 'immer';

const initialState = {
  list: [
    { id: 'SHOW_ALL', name: 'All', active: true },
    { id: 'SHOW_TODO', name: 'ToDo', active: false },
    { id: 'SHOW_COMPLETED', name: 'Completed', active: false },
  ],
  currentFilter: 'SHOW_ALL',
};

const actions = {
  setCurrent: function (filterId) {
    return {
      type: 'filters/setCurrent',
      payload: filterId,
    };
  },
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case 'filters/setCurrent':
      return produce(state, (draftState) => {
        draftState.currentFilter = action.payload;
        Object.values(draftState.list).forEach((filter) => {
          filter.active = filter.id === draftState.currentFilter;
        });
      });
    default:
      return state;
  }
}

export const { setCurrent } = actions;

export const selectFiltersList = (state) => state.filters.list;
export const selectCurrentFilter = (state) => state.filters.currentFilter;
