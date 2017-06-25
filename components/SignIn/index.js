/**
 * Created by Mak on 25/6/17.
 */
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as authActionCreators from '../../redux/actions/auth';

import SignInComponent from './SignInComponent';

function mapStateToProps(state) {
  return {
    isLoggedIn: state.auth.isLoggedIn,
    user: state.auth.userObject,
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(authActionCreators, dispatch);
}

const SignIn = connect(
  mapStateToProps,
  mapDispatchToProps
)(SignInComponent);

export default SignIn;