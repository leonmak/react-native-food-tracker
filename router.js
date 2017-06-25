/**
 * Created by Mak on 25/6/17.
 */
import React from 'react';
import UploadImage from './components/UploadImage/index';
import SignIn from './components/SignIn';
import TabScreen from './components/TabScreen';
import Food from './components/Food';

import { createRouter } from '@expo/ex-navigation';

const Router = createRouter(() => ({
  tabs: () => TabScreen,
  track: () => Food,
  upload: () => UploadImage,
  profile: () => SignIn,
}));

export default Router;