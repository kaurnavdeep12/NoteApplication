import React from 'react';
import NotesScreen from '../Screens/NotesScreen';
import NoteDetailScreen from '../Screens/NoteDetailScreen';

import {AuthParamList} from '../Types/NavigationParams';

import {createStackNavigator} from '@react-navigation/stack';
import Login from '../Screens/Login';
import Register from '../Screens/Register';
import Splash from '../Screens/Splash';
import SvgImage from '../Screens/TaskDetailScreen';
import TaskDetailScreen from '../Screens/TaskDetailScreen';
import ScanImageScreen from '../Screens/ScanImageScreen';
import VideoCallingScreen from '../Screens/VideoCallingScreen';

export default function AppNavigator() {
  const Stack = createStackNavigator<AuthParamList>();

  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="Splash" component={Splash} />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Register" component={Register} />
      <Stack.Screen
        name="NotesScreen"
        component={NotesScreen}
        options={{
          title: 'Note App',
          headerStyle: {
            backgroundColor: '#f4511e',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      />
      <Stack.Screen
        name="NoteDetailScreen"
        component={NoteDetailScreen}
        options={{
          title: 'Note App',
          headerStyle: {
            backgroundColor: '#f4511e',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      />
      <Stack.Screen name="TaskDetailScreen" component={TaskDetailScreen} />
      <Stack.Screen name="ScanImageScreen" component={ScanImageScreen} />
      <Stack.Screen name="VideoCallingScreen" component={VideoCallingScreen} />
    </Stack.Navigator>
  );
}
