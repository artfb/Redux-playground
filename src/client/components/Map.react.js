import React from 'react';

// export default ({ users }) => {
//   console.log(users.toJS());
//   const map = new window.google.maps.Map(document.getElementById('map'), {
//     zoom: 4,
//     center: { lat: 0, lng: 0 }
//   });
//
//   return (
//     <div>
//       <div id="map" style={{ top: 0, bottom: 0, left: 0, right: 0, position: 'absolute' }} />
//     </div>
//   );
// };

export default class Map extends React.Component {
  constructor(props) {
    super(props);
    this.map = null;
  }

  componentWillMount() {
    this.props.fetchUsers();
  }

  componentDidMount() {
    const map = new window.google.maps.Map(document.getElementById('map'), {
      zoom: 2,
      center: { lat: 0, lng: 0 },
    });

    this.map = map;
  }

  componentWillReceiveProps(nextProps) {
    const { users, router } = nextProps;
    users.get('usersList').map((user) => {
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
