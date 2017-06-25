/**
 * Created by Mak on 25/6/17.
 */
import { combineReducers } from 'redux';
import AuthReducer from './auth';
import { NavigationReducer } from '@expo/ex-navigation';

const rootReducer = combineReducers({
  navigation: NavigationReducer,
  auth: AuthReducer,
})

export default rootReducer;