import { Record } from 'immutable';

const InitialState = Record({
  users: [],
  currentUser: null
});

const usersReducer = (state = new InitialState(), action) => {
  switch (action.type) {
    case 'LOAD_USERS_FULFILLED':
      console.log(action.payload);
      return state.update('users', () => action.payload);
    default:
      return state;
  }
};

export default usersReducer;
