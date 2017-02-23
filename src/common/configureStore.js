import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import promiseMiddleware from 'redux-promise-middleware';
import createLogger from 'redux-logger';
import storageDebounce from 'redux-storage-decorator-debounce';
import storageFilter from 'redux-storage-decorator-filter';
import { createMiddleware as createStorageMiddleware } from 'redux-storage';
import createEngine from 'redux-storage-engine-localstorage';

import appReducer from './reducers';

const configureStore = (preloadedState, isBrowser = false) => {
  const engineKey = 'my-app-redux-storage';
  const engine = createEngine(engineKey);
  let decoratedEngine = storageFilter(engine, [
    ['photos', 'perPage'],
  ]);
  decoratedEngine = storageDebounce(decoratedEngine, 300);

  const middlewares = [
    thunk,
    promiseMiddleware(),
    createStorageMiddleware(decoratedEngine, [], [
      'SET_PER_PAGE',
    ]),
  ];
  if (isBrowser) {
    const logger = createLogger();
    middlewares.push(logger);
  }
  const store = createStore(
    appReducer,
    preloadedState,
    applyMiddleware(
      ...middlewares,
    ),
  );

  return { store, storageEngine: engine };
};

export default configureStore;
