import React from 'react';
import NotesScreen from '../Screens/NotesScreen';
// import Splash from '../Screens/Splash';
import NoteDetailScreen from '../Screens/NoteDetailScreen';

import {AuthParamList} from '../Types/NavigationParams';

import {createStackNavigator} from '@react-navigation/stack';
import Login from '../Screens/Login';
import Register from '../Screens/Register';
import HomeScreen from '../Screens/HomeScreen';
import Splash from '../Screens/Splash';

// add stack navigator
export default function AppNavigator() {
  const Stack = createStackNavigator<AuthParamList>();

  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="Splash" component={Splash} />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Register" component={Register} />
      <Stack.Screen name="HomeScreen" component={HomeScreen} />
      <Stack.Screen name="NotesScreen" component={NotesScreen} />
      <Stack.Screen name="NoteDetailScreen" component={NoteDetailScreen} />
    </Stack.Navigator>
  );
}
