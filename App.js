import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Provider } from 'react-redux';
import UploadImage from './components/UploadImage';
import SignIn from './components/SignIn';
import { initFirebase } from './utils/firebase';

import configureStore from './redux/store/configureStore';

const store = configureStore();
initFirebase(store.dispatch);

export default class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <View style={styles.container}>
          <Text></Text>
          <SignIn />
          <UploadImage />
        </View>
      </Provider>
    );
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
