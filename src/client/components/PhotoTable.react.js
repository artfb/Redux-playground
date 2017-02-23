import React from 'react';

class Table extends React.Component {
  static propTypes = {
    items: React.PropTypes.array.isRequired
  }

  constructor(props) {
    super(props);
    this.state = {
      currentPage: 1,
    };
  }

  render() {
    const { items, handlePerPageChange, perPage } = this.props;
    const maxPage = Math.ceil(items.length / this.state.perPage);
    const { currentPage } = this.state;
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
        <select
          onChange={(e) => {
            this.setState({
              perPage: e.target.value,
              currentPage: 1,
            }, () => handlePerPageChange(this.state.perPage));
          }}
          defaultValue={perPage}
        >
          <option value="5">5</option>
          <option value="10">10</option>
          <option value="15">15</option>
        </select>
        <table>
          <tbody>
            <tr>
              {items.slice((currentPage - 1) * perPage, perPage * currentPage).map(item =>
                <td key={`photo-${item.id}`}>
                  <img src={item.thumbnailUrl} />
                  {item.id}
                </td>,
              )}
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
}

export default Table;
