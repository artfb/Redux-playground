import React from 'react';
import { Link } from 'react-router';

export default () => {
  return (
    <div>
      <Link to="/">Home Page</Link><br />
      <Link to="/hello">Hello Page</Link><br />
      <Link to="/table">Table Page</Link>
    </div>
  );
}
