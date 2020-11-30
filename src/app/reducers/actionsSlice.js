import produce from 'immer';

const initialState = { requestStatus: 'idle' };

const actions = {
  setBusy: function () {
    return {
      type: 'actions/setBusy',
    };
  },
  setIdle: function () {
    return {
      type: 'actions/setIdle',
    };
  },
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case 'actions/setBusy':
      return produce(state, (draftState) => {
        draftState.requestStatus = 'pending';
      });
    case 'actions/setIdle':
      return produce(state, (draftState) => {
        draftState.requestStatus = 'idle';
      });
    default:
      return state;
  }
};

export const { setBusy, setIdle } = actions;

export const selectRequestStatus = (state) => state.actions.requestStatus;
