import React from 'react';
import { connect } from 'react-redux';
import Table from '../components/Table.react';
import { fetchAlbums } from '../../common/actions';

class Photos extends React.Component {
  componentWillMount() {
    this.props.fetchAlbums(this.props.params.userId);
  }
  componentDidMount() {
  }

  render() {
    // if (this.props.albums.get('albums', false) && this.props.albums.get('forId') === parseInt(this.props.params.userId, 10)) {
    //   return (<Table items={this.props.albums.get('photos')} />);
    // }

    return <Table items={this.props.photos.toJS().photos} />;
  }
}

export default connect(state => ({
  photos: state.photos,
}), { fetchAlbums })(Photos);
