import { connect } from 'react-redux';
import UserCard from '../components/UserCard.react';

export default connect((state, ownProps) => ({
  // FIXME put logic in function body, return plain object
  currentUser: state.users.get('usersList', []).filter(user => user.id === parseInt(ownProps.params.userId, 10)).pop(),
}), null)(UserCard);
