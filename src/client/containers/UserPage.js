import { connect } from 'react-redux';
import UserCard from '../components/UserCard/UserCard.react';

export default connect((state, ownProps) => {
  if (state.users.get('usersList').size) {
    const currentUser = state.users.get('usersList')
      .filter(user => user.get('id') === parseInt(ownProps.params.userId, 10)).first();
    return {
      currentUser: currentUser.toJS(),
    };
  }
  return {};
}, null)(UserCard);
