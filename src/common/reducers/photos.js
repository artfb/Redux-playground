import { Record, List, fromJS } from 'immutable';

const InitialState = Record({
  photos: List(),
  forId: null,
  perPage: 5,
});

const photosReducer = (state = new InitialState(), action) => {
  switch (action.type) {
    case 'FETCH_ALBUMS_FULFILLED':
      return state
        .set('photos', fromJS(action.payload.photos))
        .set('forId', action.payload.forId);
    case 'LOAD_PER_PAGE':
    case 'SET_PER_PAGE':
      return state.set('perPage', action.payload);
    default:
      return state;
  }
};

export default photosReducer;
