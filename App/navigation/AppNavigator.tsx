import React from 'react';
import {Provider} from 'react-redux';

import Login from '../Screens/Login';
import Register from '../Screens/Register';
import store from '../redux/reducer';
import {AuthParamList} from '../Types/NavigationParams';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

// add stack navigator
export default function AppNavigator() {
  const Stack = createStackNavigator<AuthParamList>();

  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{headerShown: false}}>
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Register" component={Register} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
