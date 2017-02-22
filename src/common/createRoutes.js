import App from '../client/containers/App';
import Content from '../client/components/Content.react';
import AlbumsPage from '../client/containers/AlbumsPage';
import PhotosPage from '../client/containers/PhotosPage';

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
            path: '/user/:userId',
            getComponent(nextState, cb) {
              require.ensure([], (require) => {
                const UserPage = require('../client/containers/UserPage.js').default;
                cb(null, UserPage);
              }, 'user');
            },
            name: 'userPage',
            childRoutes: [
              {
                path: 'albums',
                component: AlbumsPage,
              },
              {
                path: 'photos',
                component: PhotosPage,
              },
            ],
          },
        ],
      },
    ],
  };
}
