import { Record, List } from 'immutable';

const InitialState = Record({
  photos: List([]),
  forId: null,
});

const photosReducer = (state = new InitialState(), action) => {
  switch (action.type) {
    case 'FETCH_ALBUMS_FULFILLED':
      return state
        .set('photos', action.payload.photos)
        .set('forId', action.payload.forId);
    default:
      return state;
  }
};

export default photosReducer;
