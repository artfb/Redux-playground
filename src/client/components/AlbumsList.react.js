import React, { PropTypes } from 'react';

const AlbumsList = ({ items }) => (
  <table>
    <tbody>
      {items.map(item =>
        <tr key={`album-${item.id}`}>
          <td>{item.id}</td>
          <td>{item.title}</td>
        </tr>,
      )}
    </tbody>
  </table>
);

AlbumsList.defaultProps = {
  items: [],
};

AlbumsList.propTypes = {
  items: PropTypes.array,
};

export default AlbumsList;
