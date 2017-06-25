/**
 * Created by Mak on 25/6/17.
 */
import React from 'react';
import { View, Text, Button } from 'react-native';

const SignInComponent = props => (
  <View>
    {props.isLoggedIn
      ? <Text>Hi {props.user.displayName}</Text>
      : <Button onPress={props.attemptLogin} title="Log In With Facebook"/>
    }
  </View>
)

export default SignInComponent