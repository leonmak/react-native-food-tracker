/**
 * Created by Mak on 25/6/17.
 */
const React = require("react-native");
const firebase = require("firebase");
import store from '../redux/store';
import config from '../config';
import { checkSessionStatus } from '../redux/actions/auth';

// Initialize Firebase
const firebaseConfig = {
  apiKey: config.firebase.apiKey,
  authDomain: config.firebase.authDomain,
  databaseURL: config.firebase.databaseURL,
  storageBucket: config.firebase.storageBucket,
};

firebase.initializeApp(firebaseConfig);
export default firebase;

const rootRef = firebase.database().ref();
export const usersRef = rootRef.child('users');

export const initFirebase = (store) => {
  // Listen for authentication state to change.
  firebase.auth().onAuthStateChanged((user) => {
    if (user !== null) {
      console.log("Authenticated!");
      store.dispatch(checkSessionStatus());
    } else {
      console.log("Not authenticated!");
    }
  });
}

export const getFoodRef = () => {
  const authState = store.getState().auth;
  if (!authState.isLoggedIn) {
    return null;
  }
  const currentUser = firebase.auth().currentUser;
  const uid = currentUser.uid
  return usersRef.child(uid).child('foods');
}
