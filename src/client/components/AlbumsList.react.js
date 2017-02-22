import React from 'react';

const AlbumsList = ({ items }) => {
  return (
    <table>
      <tbody>
        {items.map(item =>
          <tr>
            <td>{item.id}</td>
            <td>{item.title}</td>
          </tr>
        )}
      </tbody>
    </table>
  );
};

export default AlbumsList;
