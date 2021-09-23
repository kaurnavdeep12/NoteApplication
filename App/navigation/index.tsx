import React from 'react';
import {Provider} from 'react-redux';

import NotesScreen from '../Screens/NotesScreen';

import Splash from '../Screens/Splash';
import NoteDetailScreen from '../Screens/NoteDetailScreen';

import store from '../redux/reducer';

import {AuthParamList} from '../Types/NavigationParams';

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
          <Stack.Screen name="NoteDetailScreen" component={NoteDetailScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
