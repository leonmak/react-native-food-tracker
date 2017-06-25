/**
 * Created by Mak on 25/6/17.
 */
const React = require("react-native");
const firebase = require("firebase");
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

// Create a reference with .ref() instead of new Firebase(url)
const rootRef = firebase.database().ref();
export const usersRef = rootRef.child('users');
export const foodRef = rootRef.child('food');

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

