/**
 * Created by Mak on 25/6/17.
 */
import React from 'react';
import { Text, StyleSheet, View } from 'react-native';

export default class Home extends React.Component {
  render() {
    return (
      <View style={styles.container} >
        <Text>Home</Text>
      </View>
    )
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