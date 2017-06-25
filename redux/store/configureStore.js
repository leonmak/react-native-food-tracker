import {createStore, compose, applyMiddleware} from 'redux';
import { createNavigationEnabledStore } from '@expo/ex-navigation';

import thunkMiddleware from 'redux-thunk';
import rootReducer from '../reducers';

const createStoreWithNavigation = createNavigationEnabledStore({
  createStore,
  navigationStateKey: 'navigation',
});

export default function configureStore(initialState) {
  const middewares = [
    thunkMiddleware,
  ];

  return createStoreWithNavigation(rootReducer, initialState, compose(
    applyMiddleware(...middewares)
    )
  );
}
