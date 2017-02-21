import React from 'react';

const Table = ({ fetchData, users = [] }) => {
  console.log(users);
  return (
    <div>
      <button onClick={fetchData}>Fetch</button>
      <ul>
        {Boolean(users.length) && users.map(user => {
          console.log(user);
          return <li key={`user${user.id}`}>{user.name}</li>;
        })}
      </ul>
      <table>
        <tbody>
          <tr>
            <td>1</td>
            <td>2</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default Table;
