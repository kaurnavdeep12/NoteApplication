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
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();

  function onAuthStateChanged(user: any) {
    setUser(user);
    if (initializing) setInitializing(false);
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  if (initializing) return null;
  return (
    <NavigationContainer>
      <AppNavigator />
    </NavigationContainer>
  );
}
