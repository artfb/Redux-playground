import React from 'react';
import Content from './Content.react';
import Menu from './Menu.react';
import Map from './Map.react';

export default ({ children, app, router, fetchUsers }) => {
  return (
    <div>
      <Map users={app.users} router={router} fetchUsers={fetchUsers} />
      <div style={{ position: 'absolute', right: 0 }}>
        {React.Children.map(children,
          child => React.cloneElement(child, {
            ...app,
          }),
        )}
      </div>
    </div>
  );
};
