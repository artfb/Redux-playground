import { connect } from 'react-redux';
import Table from '../components/Table.react';
import * as Actions from '../../common/actions';

export default connect(state => ({
  users: state.users.get('users'),
}), Actions)(Table);
