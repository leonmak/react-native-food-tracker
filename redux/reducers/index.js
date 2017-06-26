/**
 * Created by Mak on 25/6/17.
 */
import { combineReducers } from 'redux';
import auth from './auth';
import food from './food';
import { NavigationReducer } from '@expo/ex-navigation';

const rootReducer = combineReducers({
  navigation: NavigationReducer,
  auth,
  food,
})

export default rootReducer;