import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import promiseMiddleware from 'redux-promise-middleware';
import createLogger from 'redux-logger';
import appReducer from './reducers';

const configureStore = () => {
  const logger = createLogger();
  const store = createStore(
    appReducer,
    applyMiddleware(
      thunk,
      promiseMiddleware(),
      logger,
    ),
  );

  return store;
};

export default configureStore;
