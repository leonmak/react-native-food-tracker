/**
 * Created by Mak on 25/6/17.
 */
import React from 'react';
import UploadImage from '../components/UploadImage';
import SignIn from '../components/SignIn';
import TabScreen from '../components/TabScreen';
import Track from '../components/Track';
import Food from '../components/Food';

import { createRouter } from '@expo/ex-navigation';

const router = createRouter(() => ({
  tabs: () => TabScreen,
  track: () => Track,
  upload: () => UploadImage,
  profile: () => SignIn,
  signIn: () => SignIn,
  food: () => Food
}));

export const goToTab = (tabName, navigator) => {
  navigator.performAction(({tabs}) => tabs('main').jumpToTab(tabName));
}

export default router;