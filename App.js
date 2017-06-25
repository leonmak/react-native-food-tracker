import React from 'react';
import Router from './router';
import { StyleSheet, Text, View } from 'react-native';
import { Provider } from 'react-redux';
import { initFirebase } from './utils/firebase';

import {
  NavigationContext,
  NavigationProvider,
  StackNavigation,
} from '@expo/ex-navigation';

import configureStore from './redux/store/configureStore';

export const Store = configureStore();
initFirebase(Store.dispatch);

const navigationContext = new NavigationContext({
  router: Router,
  store: Store,
})

export default class App extends React.Component {
  render() {
    return (
      <Provider store={Store}>
        <NavigationProvider context={navigationContext}>
          <StackNavigation initialRoute={Router.getRoute('tabs')} />
        </NavigationProvider>
      </Provider>
    );
  }
}
