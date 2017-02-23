import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import PhotoTable from '../components/PhotoTable.react';
import { fetchAlbums, setPerPage } from '../../common/actions';

class Photos extends React.Component {

  static propTypes = {
    photos: PropTypes.array.isRequired,
    perPage: PropTypes.number.isRequired,
    fetchAlbums: PropTypes.func.isRequired,
    setPerPage: PropTypes.func.isRequired,
    params: PropTypes.shape({
      userId: PropTypes.string.isRequired,
    }).isRequired,
  }

  static needs = [
    fetchAlbums,
  ]

  componentWillMount() {
    const { photos, params } = this.props;
    if (photos.forId !== parseInt(params.userId, 10)) {
      this.props.fetchAlbums(params);
    }
  }

  render() {
    const { photos, perPage } = this.props;
    return (
      <PhotoTable
        items={photos}
        perPage={perPage}
        handlePerPageChange={this.props.setPerPage}
      />
    );
  }
}

export default connect(state => ({
  photos: state.photos.get('photos').toJS(),
  perPage: parseInt(state.photos.get('perPage'), 10),
}), { fetchAlbums, setPerPage })(Photos);
