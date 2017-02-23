import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './style.scss';

class Table extends React.Component {
  static propTypes = {
    items: React.PropTypes.array.isRequired,
    perPage: React.PropTypes.number.isRequired,
    handlePerPageChange: React.PropTypes.func.isRequired,
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
      Boolean(items.length) && <div className="row">
        <div className="col-xs-12">
          Show: <select
            onChange={(e) => {
              this.setState({
                perPage: e.target.value,
                currentPage: 1,
              }, () => handlePerPageChange(this.state.perPage));
            }}
            value={perPage}
          >
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="15">15</option>
          </select>
          <div className={s.tableContainer}>
            <table className="table table-responsive">
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
          <ul className="pager">
            <li>
              <a
                onClick={() => this.setState({
                  currentPage: currentPage === 1 ? 1 : currentPage - 1,
                })}
                >Previous</a></li>
              <li>
                <a
                  onClick={() => this.setState({
                    currentPage: currentPage === maxPage ? maxPage : currentPage + 1,
                  })}
                  >Next</a>
              </li>
            </ul>
        </div>
      </div>
    );
  }
}

export default withStyles(s)(Table);
