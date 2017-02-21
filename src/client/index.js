import React from 'react';
import { render } from 'react-dom';
import { Router, browserHistory } from 'react-router';
import { Provider } from 'react-redux';
import createRoutes from '../common/createRoutes';
import configureStore from '../common/configureStore';

const store = configureStore({});

render(
  <Provider store={store}>
    <Router history={browserHistory} routes={createRoutes()} />
  </Provider>,
  document.getElementById('root')
);
