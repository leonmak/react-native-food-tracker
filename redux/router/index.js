/**
 * Created by Mak on 25/6/17.
 */
import React from 'react';
import UploadImage from '../../components/UploadImage';
import SignIn from '../../components/SignIn';
import TabScreen from '../../components/TabScreen';
import Track from '../../components/Track';

import store from '../store';

import { createRouter } from '@expo/ex-navigation';

const router = createRouter(() => ({
  tabs: () => TabScreen,
  track: () => Track,
  upload: () => UploadImage,
  profile: () => SignIn,
  signIn: () => SignIn,
}));

export const goTo = routeName => {
  let navigatorUID = store.getState().navigation.currentNavigatorUID;
  store.dispatch(NavigationActions.push(navigatorUID, router.getRoute(routeName)))
}

export default router;