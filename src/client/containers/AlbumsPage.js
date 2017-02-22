import React from 'react';
import { connect } from 'react-redux';
import AlbumsList from '../components/AlbumsList.react';
import { fetchAlbums } from '../../common/actions';


class Albums extends React.Component {
  componentWillMount() {
    this.props.fetchAlbums(this.props.params.userId);
  }

  render() {
    if (this.props.albums.get('albums', false) && this.props.albums.get('forId') === parseInt(this.props.params.userId, 10)) {
      return (<AlbumsList items={this.props.albums.get('albums')} />);
    }

    return <div />;
  }
}

export default connect(state => ({
  albums: state.albums,
}), { fetchAlbums })(Albums);
