import App from '../client/containers/App';
import Content from '../client/components/Content.react';

export default function createRoutes() {
  return {
    component: App,
    path: '/',
    childRoutes: [
      {
        component: Content,
        childRoutes: [
          {
            path: '/hello',
            getComponent(nextState, cb) {
              require.ensure([], (require) => {
                const Hello = require('../client/containers/HelloPage.react').default;
                cb(null, Hello);
              }, 'hello');
            },
            name: 'helloPage',
          },
          {
            path: '/table',
            getComponent(nextState, cb) {
              require.ensure([], (require) => {
                const TablePage = require('../client/containers/TablePage.js').default;
                cb(null, TablePage);
              }, 'table');
            },
            name: 'tablePage',
          },
        ],
      },
    ],
  };
}
