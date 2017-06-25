/**
 * Created by Mak on 25/6/17.
 */
import {
  Clicked_Login, Login_Success, Login_Fail,
  Checked_Session_Status,
  Clicked_Logout, Logout_Success,
} from '../constants';

import config from '../../config'
import firebase from '../../utils/firebase';

/*
 * action creators
 */

export function clickedLogin() {
  return { type: Clicked_Login };
}

export function loginSuccess(userObject) {
  return { type: Login_Success, userObject };
}

export function loginFail(error) {
  return { type: Login_Fail, error };
}

export function attemptLogin() {
  return async (dispatch) => {
    dispatch(clickedLogin());
    const {type, token} = await Expo.Facebook.logInWithReadPermissionsAsync(config.facebook.appId, {
      permissions: ['public_profile', 'email']
    });

    if (type === 'success') {
      // Build Firebase credential with the Facebook access token.
      const credential = firebase.auth.FacebookAuthProvider.credential(token);

      // Sign in with credential from the Facebook user.
      firebase.auth().signInWithCredential(credential).catch((error) => {
        dispatch(loginFail({error}))
      });
      dispatch(loginSuccess(firebase.auth().currentUser));
    }
  }
}

export function checkedSessionStatus(payload) {
  return { type: Checked_Session_Status, payload };
}

export function checkSessionStatus() {
  return (dispatch) => {
    const user = firebase.auth().currentUser;
    if (user) {
      dispatch(checkedSessionStatus(user))
    }
  }
}

export function clickedLogout() {
  return { type: Clicked_Logout };
}

export function logoutSuccess() {
  return { type: Logout_Success };
}

export function attemptLogout(){
  return (dispatch) => {
    dispatch(clickedLogout());
    firebase.auth().signOut().then(() => {
      dispatch(logoutSuccess());
    });
  }
}
