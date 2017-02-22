import { Record, List } from 'immutable';

const InitialState = Record({
  usersList: List([]),
});

const usersReducer = (state = new InitialState(), action) => {
  switch (action.type) {
    case 'FETCH_USERS_FULFILLED':
      return state.update('usersList', () => action.payload);
    default:
      return state;
  }
};

export default usersReducer;
