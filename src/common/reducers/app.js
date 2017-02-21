import { Record } from 'immutable';

const InitialState = Record({
  test: 'test',
});

const appReducer = (state = new InitialState(), action) => {
  return state;
};

export default appReducer;
