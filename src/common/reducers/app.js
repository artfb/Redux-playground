import { Record } from 'immutable';

const InitialState = Record({
  error: null,
});

const appReducer = (state = new InitialState(), action) => {
  switch (action.type) {
    case 'ERROR_MESSAGE':
      return state.set('error', action.payload);
    case 'CLOSE_ERROR_MESSAGE':
      return state.set('error', null);
    default:
      return state;
  }
};

export default appReducer;
