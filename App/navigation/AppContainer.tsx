import {NavigationContainer} from '@react-navigation/native';
// import navigators
import AppNavigator from './AppNavigator';
import AuthNavigator from './AuthNavigator';
import React, {useState, useEffect} from 'react';
import {View, Text} from 'react-native';
import auth from '@react-native-firebase/auth';
import store from '../redux/reducer';
import {Provider} from 'react-redux';

export default function AppContainer() {
  return (
    <NavigationContainer>
      <AppNavigator />
    </NavigationContainer>
  );
}
