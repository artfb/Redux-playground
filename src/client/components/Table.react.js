import React from 'react';

class Table extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      perPage: 8,
      currentPage: 1,
    };
  }
  render() {
    const { items } = this.props;
    const maxPage = Math.ceil(items.length / this.state.perPage);
    const { currentPage, perPage } = this.state;
    return (
      Boolean(items.length) && <div>
        <button
          onClick={() => this.setState({
            currentPage: currentPage === 1 ? 1 : currentPage - 1,
          })}
        >down</button>
        <button
          onClick={() => this.setState({
            currentPage: currentPage === maxPage ? maxPage : currentPage + 1,
          })}
        >up</button>
        <input
          onChange={(e) => {
            this.setState({
              perPage: e.target.value,
              currentPage: 1,
            });
          }}
          type="number"
          defaultValue={perPage}
          max={items.length}
        />
        <table>
          <tbody>
            {items.slice((currentPage - 1) * perPage, perPage * currentPage).map(item => <tr>
              <td>{item.id}</td>
              <td>
                <img src={item.thumbnailUrl} />
              </td>
            </tr>)}
          </tbody>
        </table>
      </div>
    );
  }
}

export default Table;
