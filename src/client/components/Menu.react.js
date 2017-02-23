import React, { PropTypes } from 'react';
import { Link } from 'react-router';

const Menu = ({ forId }) => <ul className="nav nav-tabs">
  <li role="presentation">
    <Link to={`/user/${forId}/albums`} activeClassName="active">Albums</Link>
  </li>
  <li role="presentation">
    <Link to={`/user/${forId}/photos`} activeClassName="active">Photos</Link>
  </li>
</ul>;

Menu.propTypes = {
  forId: PropTypes.number.isRequired,
};

export default Menu;
