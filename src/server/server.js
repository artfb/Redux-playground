/* eslint-disable no-console, no-use-before-define */

// import path from 'path';
import Express from 'express';
import React from 'react';
import path from 'path';

import { renderToString } from 'react-dom/server';
import { Provider } from 'react-redux';
import { match, RouterContext } from 'react-router';

import configureStore from '../common/configureStore';
import { fetchComponentData } from '../common/utils';
import createRoutes from '../common/createRoutes';

import AppWithContext from '../common/AppWithContext';

const app = new Express();
const port = 3000;

app.use(Express.static(path.join(__dirname, '/')));

// This is fired every time the server side receives a request
app.use(handleRender);

app.listen(port, (error) => {
  if (error) {
    console.error(error);
  } else {
    console.info(`==> 🌎  Listening on port ${port}. Open up http://localhost:${port}/ in your browser.`);
  }
});

function handleRender(req, res) {
  const routes = createRoutes();
  match({ routes, location: req.url }, (error, redirectLocation, renderProps) => {
    if (error) {
      res.status(500).send(error.message);
    } else if (redirectLocation) {
      res.redirect(302, redirectLocation.pathname + redirectLocation.search);
    } else if (renderProps) {
      // You can also check renderProps.components or renderProps.routes for
      // your "not found" component or route respectively, and send a 404 as
      // below, if you're using a catch-all route.
      const { store } = configureStore();
      fetchComponentData(store.dispatch, renderProps.components, renderProps.params)
        .then(() => {
          const css = new Set(); // CSS for all rendered React components
          const context = {
            // Enables critical path CSS rendering
            // https://github.com/kriasoft/isomorphic-style-loader
            insertCss: (...styles) => {
              // eslint-disable-next-line no-underscore-dangle
              styles.forEach(style => css.add(style._getCss()));
            },
          };
          const html = renderToString(
            <Provider store={store}>
              <AppWithContext context={context}>
                <RouterContext {...renderProps} />
              </AppWithContext>
            </Provider>,
          );

          // Grab the initial state from our Redux store
          const finalState = store.getState();

          // Send the rendered page back to the client
          res.status(200).send(renderFullPage({ html, css }, finalState));
        });
    } else {
      res.status(404).send('Not found');
    }
  });
}

function renderFullPage({ html, css }, preloadedState) {
  return `
    <!doctype html>
    <html lang="en">
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <title>devServer</title>
        <style type="text/css">${[...css].join('')}</style>
      </head>
      <body>
        <div id="root">${html}</div>
        <script>
          window.PRELOADED_STATE = ${JSON.stringify(preloadedState).replace(/</g, '\\x3c')}
        </script>
        <script defer src="https://maps.googleapis.com/maps/api/js?key=AIzaSyB1v6uTNT7U858UpmwoiTyZ9WHKyJsKRsI"></script>
        <script defer src="/bundle.js"></script>
      </body>
    </html>

    `;
}
