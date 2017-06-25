import React from 'react';
import { StatusBar } from 'react-native';
import router from './redux/router';
import store from './redux/store';
import { Provider } from 'react-redux';
import { initFirebase } from './utils/firebase';

import { NavigationContext,  NavigationProvider,  StackNavigation } from '@expo/ex-navigation';

initFirebase(store);

const navigationContext = new NavigationContext({ router, store })

export default class App extends React.Component {
  componentWillMount() {
    StatusBar.setHidden(true);
  }

  render() {
    return (
      <Provider store={store}>
        <NavigationProvider context={navigationContext}>
          <StackNavigation initialRoute={router.getRoute('tabs')} />
        </NavigationProvider>
      </Provider>
    );
  }
}
