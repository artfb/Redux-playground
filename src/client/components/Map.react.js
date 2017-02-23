/* eslint-env browser */
import React, { PropTypes } from 'react';
import { routerShape } from 'react-router';

export default class Map extends React.Component {

  static propTypes = {
    router: routerShape.isRequired,
    usersList: PropTypes.array.isRequired,
  }
  constructor(props) {
    super(props);
    this.map = null;
  }

  componentDidMount() {
    const { usersList } = this.props;
    const map = new window.google.maps.Map(document.getElementById('map'), {
      zoom: 2,
      center: { lat: 0, lng: 0 },
    });

    this.map = map;

    if (usersList.length) {
      this.populateUsers(usersList);
    }
  }

  componentWillUpdate(nextProps) {
    if (nextProps.usersList.length !== this.props.usersList.length) {
      this.populateUsers(nextProps.usersList);
    }
  }

  populateUsers(users) {
    const { router } = this.props;
    users.forEach((user) => {
      const marker = new window.google.maps.Marker({
        map: this.map,
        position: {
          lat: parseFloat(user.address.geo.lat),
          lng: parseFloat(user.address.geo.lng),
        },
      });

      marker.addListener('click', () => {
        router.push(`/user/${user.id}`);
      });
    });
  }

  render() {
    return (
      <div>
        <div id="map" style={{ top: 0, bottom: 0, left: 0, right: 0, position: 'absolute' }} />
      </div>
    );
  }
}
