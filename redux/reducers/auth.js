import {
  Clicked_Login, Login_Success, Login_Fail,
  Checked_Session_Status,
  Clicked_Logout, Logout_Success,
} from '../constants';

const defaultStartState = {
  isLoggedIn: false,
  fetchingAuthUpdate: false,
  userObject: null,
  error: null
}

export default function authReducer(userAuthState = defaultStartState, {type, payload}) {
  switch (type){
    case Clicked_Login:
    case Clicked_Logout:
      return Object.assign({}, userAuthState, {
        fetchingAuthUpdate: true
      });

    case Login_Success:
      return Object.assign({}, userAuthState, {
        isLoggedIn: true,
        fetchingAuthUpdate: false,
        userObject: userObject,
        error: null
      });

    case Login_Fail:
      return Object.assign({}, userAuthState, {
        isLoggedIn: false,
        fetchingAuthUpdate: false,
        error: error
      });

    case Checked_Session_Status:
      if (payload) {
        return Object.assign({}, userAuthState, {
          isLoggedIn: true,
          fetchingAuthUpdate: false,
          userObject: payload,
          error: null
        });
      }
      return Object.assign({}, defaultStartState);

    case Logout_Success:
      return Object.assign({}, defaultStartState);

    default:
      return userAuthState;
  }
}