import React, { PropTypes } from 'react';
import { routerShape } from 'react-router';
import Map from './Map.react';
import { fetchUsers } from '../../common/actions';

class Layout extends React.Component {

  static defaultProps = {
    children: null,
  }

  static propTypes = {
    app: PropTypes.object.isRequired,
    fetchUsers: PropTypes.func.isRequired,
    closeError: PropTypes.func.isRequired,
    router: routerShape.isRequired,
    children: PropTypes.element,
  };

  static needs = [
    fetchUsers,
  ];

  componentWillMount() {
    if (!this.props.app.users.get('usersList').length) {
      this.props.fetchUsers();
    }
  }
  render() {
    const { app, children, router } = this.props;
    return (
      <div>
        {app.app.error &&
          <div className="alert alert-danger" style={{ position: 'relative', zIndex: 1000 }}>
            {app.app.error} <button className="btn btn-default" onClick={this.props.closeError}>Close</button>
          </div>
        }
        <Map usersList={app.users.get('usersList').toJS()} router={router} />
        {React.Children.map(children,
          child => React.cloneElement(child, {
            ...app,
          }),
        )}
      </div>
    );
  }
}

export default Layout;
