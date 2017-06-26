/**
 * Created by Mak on 25/6/17.
 */
import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as authActionCreators from '../redux/actions/auth';

function mapStateToProps(state) {
  return {
    isLoggedIn: state.auth.isLoggedIn,
    user: state.auth.userObject,
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(authActionCreators, dispatch);
}

@connect(mapStateToProps, mapDispatchToProps)
export default class SignInComponent extends React.Component {
  render() {
    const { props } = this;
    return <View style={styles.container}>
      {props.isLoggedIn
        ? <Text>Hi {props.user.providerData[0].displayName}</Text>
        : <Button onPress={props.attemptLogin} title="Log In With Facebook"/>
      }
    </View>
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});