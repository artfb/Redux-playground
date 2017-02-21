export const errMessage = message => ({
  type: 'ERROR_MESSAGE',
  payload: message,
});

export const fetchData = () => (dispatch, getState) => {
  const getPromise = () => new Promise((resolve, reject) => {
    try {
      // 400
      // fetch('http://www.mocky.io/v2/58ab6bdd100000411b4b6475')
      // 500
      // fetch('http://www.mocky.io/v2/58ab84a810000034025148f5')
      fetch('http://jsonplaceholder.typicode.com/users')
      .then((response) => {
        if (response.ok) {
          resolve(response.json());
        } else {
          reject(response.statusText);
        }
      }).catch(e => reject(e));
    } catch (e) {
      dispatch(errMessage(e));
    }
  });

  dispatch({
    type: 'LOAD_USERS',
    payload: getPromise(),
  })
  .then(() => console.log('keke', getState().users.toJS()))
  .catch(e => dispatch(errMessage(`Caught rejection ${e}`)));
};
