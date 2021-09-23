import React from 'react';
import {Provider} from 'react-redux';
import NotesScreen from './App/Screens/NotesScreen';
import Splash from './App/Screens/Splash';
import store from './App/redux/reducer';
import {routeName} from './App/utils/routeName';
import {AuthParamList} from './App/Types/NavigationParams';

import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

// add stack navigator
export default function App() {
  const Stack = createStackNavigator<AuthParamList>();

  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{headerShown: false}}>
          <Stack.Screen name="Splash" component={Splash} />
          <Stack.Screen name="NotesScreen" component={NotesScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
