import { connect } from 'react-redux';
import Layout from '../components/Layout/Layout.react';
import * as Actions from '../../common/actions';

export default connect(state => ({
  app: state,
}), Actions)(Layout);
