/**
 * Created by Mak on 25/6/17.
 */
import React from 'react';
import UploadImage from '../components/UploadImage';
import SignIn from '../components/SignIn';
import TabScreen from '../components/TabScreen';
import Track from '../components/Track';

import store from './store/index';

import { createRouter, NavigationActions } from '@expo/ex-navigation';

const router = createRouter(() => ({
  tabs: () => TabScreen,
  track: () => Track,
  upload: () => UploadImage,
  profile: () => SignIn,
  signIn: () => SignIn,
}));

export const goToTab = (tabName, navigation) => {
  navigation.performAction(({ tabs, stacks }) => {
    tabs('main').jumpToTab(tabName);
  });
}

export default router;