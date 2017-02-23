import React, { PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import Menu from '../Menu.react';
import s from './style.scss';

const UserCard = ({ children, currentUser = {} }) => {
  const { name, email, id } = currentUser;
  return (
    <div className={s.UserCard}>
      <div className={s.container}>
        <div>{ name }, { email }</div>
        <Menu forId={id} />
        {children}
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
