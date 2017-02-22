import { combineReducers } from 'redux';
import appReducer from './app';
import usersReducer from './users';
import albumsReducer from './albums';
import photosReducer from './photos';

export default combineReducers({
  app: appReducer,
  users: usersReducer,
  albums: albumsReducer,
  photos: photosReducer,
});
