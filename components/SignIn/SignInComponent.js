/**
 * Created by Mak on 25/6/17.
 */
import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

const SignInComponent = props => (
  <View style={styles.container}>
    {props.isLoggedIn
      ? <Text>Hi {props.user.displayName}</Text>
      : <Button onPress={props.attemptLogin} title="Log In With Facebook"/>
    }
  </View>
)

export default SignInComponent

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});