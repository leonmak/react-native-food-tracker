/**
 * Created by Mak on 25/6/17.
 */
import React from 'react';
import Router from '../redux/router/index';
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
      <StackNavigation id="track" navigatorUID="track" initialRoute={Router.getRoute('track')}/>
    </TabItem>

    <TabItem id="upload" title="Upload" selectedStyle={styles.selectedTab}
             renderIcon={(isSelected) => <Image source={require('../assets/images/upload.png')}/> }>
      <StackNavigation id="upload" initialRoute={Router.getRoute('upload')}/>
    </TabItem>

    <TabItem id="profile" title="Profile" selectedStyle={styles.selectedTab}
             renderIcon={(isSelected) => <Image source={require('../assets/images/profile.png')}/> }>
      <StackNavigation id="profile" initialRoute={Router.getRoute('profile')}/>
    </TabItem>
  </TabNavigation>
  : <SignIn />

export default connect(mapStateToProps)(TabScreen);

const styles = StyleSheet.create({
  selectedTab: {
    backgroundColor: 'blue',
  },
});