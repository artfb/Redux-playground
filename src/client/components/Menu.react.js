import React, { PropTypes } from 'react';
import { Link } from 'react-router';

const Menu = ({ forId }) => <nav className="btn-group">
  <Link className="btn btn-default" to={`/user/${forId}/albums`} activeClassName="btn-primary">Albums</Link>
  <Link className="btn btn-default" to={`/user/${forId}/photos`} activeClassName="btn-primary">Photos</Link>
</nav>;

Menu.propTypes = {
  forId: PropTypes.number.isRequired,
};

export default Menu;
