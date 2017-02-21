import React from 'react';
import Content from './Content.react';
import Menu from './Menu.react';
import Map from './Map.react';

export default ({ children, app }) => {
  return (
    <div>
      <Map users={app.users} />
      <div style={{ position: 'absolute', right: 0 }}>
        <Menu />
        {React.Children.map(children,
          child => React.cloneElement(child, {
            ...app,
          }),
        )}
      </div>
    </div>
  );
};
