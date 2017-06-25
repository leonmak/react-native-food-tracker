/**
 * Created by Mak on 25/6/17.
 */
import React from 'react';
import router from '../redux/router';
import { connect } from 'react-redux';
import { StyleSheet, Image } from 'react-native';
import { StackNavigation, TabNavigation, TabNavigationItem as TabItem } from '@expo/ex-navigation';

import SignIn from "./SignIn";

function mapStateToProps(state) {
  return {
    isLoggedIn: state.auth.isLoggedIn,
  }
}

const TabScreen = props => props.isLoggedIn ?
  <TabNavigation id="main" navigatorUID="main" initialTab="track">
    <TabItem id="track" title="Track" selectedStyle={styles.selectedTab}
             renderIcon={(isSelected) => <Image source={require('../assets/images/track.png')}/> }>
      <StackNavigation id="track" navigatorUID="track" initialRoute={router.getRoute('track')}/>
    </TabItem>

    <TabItem id="upload" title="Upload" selectedStyle={styles.selectedTab}
             renderIcon={(isSelected) => <Image source={require('../assets/images/upload.png')}/> }>
      <StackNavigation id="upload" initialRoute={router.getRoute('upload')}/>
    </TabItem>

    <TabItem id="profile" title="Profile" selectedStyle={styles.selectedTab}
             renderIcon={(isSelected) => <Image source={require('../assets/images/profile.png')}/> }>
      <StackNavigation id="profile" initialRoute={router.getRoute('profile')}/>
    </TabItem>
  </TabNavigation>
  : <SignIn />

export default connect(mapStateToProps)(TabScreen);

const styles = StyleSheet.create({
  selectedTab: {
    backgroundColor: 'blue',
  },
});