import React from 'react';
import store from '../redux/reducer';
import {Provider} from 'react-redux';
import {NavigationContainer} from '@react-navigation/native';
import AppNavigator from './AppNavigator';

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <AppNavigator />
      </NavigationContainer>
    </Provider>
  );
}
