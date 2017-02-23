import App from '../client/containers/App';
import AlbumsPage from '../client/containers/AlbumsPage';
import PhotosPage from '../client/containers/PhotosPage';
import Content from '../client/containers/UserPage';

export default function createRoutes() {
  return {
    component: App,
    path: '/',
    childRoutes: [
      {
        path: '/user/:userId',
        component: Content,
        // getComponent(nextState, cb) {
        //   require.ensure([], (require) => {
        //     const UserPage = require('../client/containers/UserPage.js').default;
        //     cb(null, UserPage);
        //   }, 'user');
        // },
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
  };
}
