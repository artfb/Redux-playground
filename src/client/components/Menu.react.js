import React, { PropTypes } from 'react';
import { Link } from 'react-router';

const Menu = ({ forId }) => <div>
  <Link to="/">Home Page</Link><br />
  <Link to={`/user/${forId}/albums`}>Albums</Link>
  <Link to={`/user/${forId}/photos`}>Photos</Link>
</div>;

Menu.propTypes = {
  forId: PropTypes.number.isRequired,
};

export default Menu;
