import { Record, List, fromJS } from 'immutable';

const InitialState = Record({
  albums: List(),
  forId: null,
});

const albumsReducer = (state = new InitialState(), action) => {
  switch (action.type) {
    case 'FETCH_ALBUMS_FULFILLED':
      return state
        .set('albums', fromJS(action.payload.albums))
        .set('forId', action.payload.forId);
    default:
      return state;
  }
};

export default albumsReducer;
