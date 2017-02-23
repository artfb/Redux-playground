import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import Menu from '../Menu.react';
import s from './style.scss';

const UserCard = ({ children, currentUser = {} }) => {
  const { name, email, id } = currentUser;
  return (
    <div className={`modal fade in  ${s.UserCard}`} tabIndex="-1" role="dialog">
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <Link to="/" className="close">
              <span aria-hidden="true">&times;</span>
            </Link>
            <h4 className="modal-title">
              { name }, { email }
            </h4>
          </div>
          <div className="modal-body">
            <div>
              <Menu forId={id} />
              {children}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

UserCard.defaultProps = {
  children: null,
};

UserCard.propTypes = {
  children: PropTypes.element,
  currentUser: PropTypes.object.isRequired,
};

export default withStyles(s)(UserCard);
