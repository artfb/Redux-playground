import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import AlbumsList from '../components/AlbumsList.react';
import { fetchAlbums } from '../../common/actions';


class Albums extends React.Component {
  static defaultProps = {
    forId: null,
  }

  static propTypes = {
    albums: PropTypes.array.isRequired,
    forId: PropTypes.any,
    fetchAlbums: PropTypes.func.isRequired,
    params: PropTypes.shape({
      userId: PropTypes.string,
    }).isRequired,
  }
  static needs = [
    fetchAlbums,
  ]

  componentWillMount() {
    const { forId, params } = this.props;
    if (forId !== parseInt(params.userId, 10)) {
      this.props.fetchAlbums(params);
    }
  }

  componentWillReceiveProps(nextProps) {
    // if (parseInt(nextProps.params.userId, 10) !== this.props.forId) {
    if (nextProps.params.userId !== this.props.params.userId) {
      this.props.fetchAlbums(nextProps.params);
    }
  }

  render() {
    if (this.props.forId === parseInt(this.props.params.userId, 10)) {
      return (<AlbumsList items={this.props.albums} />);
    }

    return <div />;
  }
}

export default connect(state => ({
  albums: state.albums.get('albums').toJS(),
  forId: state.albums.get('forId'),
}), { fetchAlbums })(Albums);
