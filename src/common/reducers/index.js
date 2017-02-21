import { combineReducers } from 'redux';
import appReducer from './app';
import usersReducer from './users';

export default combineReducers({
  app: appReducer,
  users: usersReducer,
});
