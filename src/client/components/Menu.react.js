import React from 'react';
import { Link } from 'react-router';

export default ({ forId }) => {
  return (
    <div>
      <Link to="/">Home Page</Link><br />
      <Link to={`/user/${forId}/albums`}>Albums</Link>
      <Link to={`/user/${forId}/photos`}>Photos</Link>
    </div>
  );
};
