import fetch from 'isomorphic-fetch';
import { fromJS } from 'immutable';

const request = (url, options = {}) =>
  new Promise((resolve, reject) => {
    if (!url) reject(new Error('URL parameter required'));

    fetch(url, options)
    .then((response) => {
      if (response.ok) {
        resolve(response.json());
      }
      reject({
        errorText: response.statusText,
        errorCode: response.status,
      });
    })
    .then((response) => {
      if (response.errors) reject(response.errors);
      else resolve(response);
    })
    .catch(reject);
  });

const errMessage = message => ({
  type: 'ERROR_MESSAGE',
  payload: message,
});

export const fetchPhotos = (albumId) => {
  const forId = parseInt(albumId, 10);
  return request(`http://jsonplaceholder.typicode.com/albums/${forId}/photos`);
};

export const fetchAlbums = ({ userId }) => (dispatch) => {
  const forId = parseInt(userId, 10);

  return dispatch({
    type: 'FETCH_ALBUMS',
    payload: request(`http://jsonplaceholder.typicode.com/albums?userId=${forId}`)
      .then(albums => Promise.all(
        // for sake of simplicity
        albums.slice(0, 1).map(album => fetchPhotos(album.id)),
      )
      .then(photos => ({ albums, forId, photos: [].concat(...photos) }))),
  })
  .catch(e => dispatch(errMessage(`Caught rejection: ${e.errorText}`)));
};

export const fetchUsers = () => dispatch => dispatch({
  type: 'FETCH_USERS',
  payload: request('http://jsonplaceholder.typicode.com/users').then(response => fromJS(response)),
})
.catch(e => dispatch(errMessage(`Caught rejection: ${e.errorText}`)));

export const setPerPage = perPage => ({
  type: 'SET_PER_PAGE',
  payload: perPage,
});

export const loadPerPage = perPage => ({
  type: 'LOAD_PER_PAGE',
  payload: perPage,
});
