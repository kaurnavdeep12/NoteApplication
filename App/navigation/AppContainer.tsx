import {NavigationContainer} from '@react-navigation/native';
// import navigators
import AppNavigator from './AppNavigator';
import React from 'react';

export default function AppContainer() {
  return (
    <NavigationContainer>
      <AppNavigator />
    </NavigationContainer>
  );
}
