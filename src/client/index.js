/* eslint-env browser */
import React from 'react';
import { render } from 'react-dom';
import { match, Router, browserHistory } from 'react-router';
import { Provider } from 'react-redux';
import createRoutes from '../common/createRoutes';
import configureStore from '../common/configureStore';
import { immutifyState } from '../common/utils';
import { loadPerPage } from '../common/actions';
import AppWithContext from '../common/AppWithContext';

const preloadedState = immutifyState(window.PRELOADED_STATE);
const isBrowser = true;
const { store, storageEngine } = configureStore(preloadedState, isBrowser);
const history = browserHistory;
const routes = createRoutes();
const context = {
  // Enables critical path CSS rendering
  // https://github.com/kriasoft/isomorphic-style-loader
  insertCss: (...styles) => {
    // eslint-disable-next-line no-underscore-dangle
    const removeCss = styles.map(x => x._insertCss());
    return () => { removeCss.forEach(f => f()); };
  },
};

// Load state from localStorage
storageEngine.load()
  .then((state) => {
    if (state.photos) {
      store.dispatch(loadPerPage(state.photos.perPage));
    }
  });

match({ history, routes }, (error, redirectLocation, renderProps) => {
  render(
    <Provider store={store}>
      <AppWithContext context={context}>
        <Router {...renderProps} />
      </AppWithContext>
    </Provider>,
    document.getElementById('root'),
  );
});
