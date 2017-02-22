import React from 'react';
import Menu from './Menu.react';

export default ({ children, currentUser: { name, email, id } }) => {
  return (
    <div>
      <div>{ name }, { email }</div>
      <Menu forId={id} />
      {children}
    </div>
  );
};
