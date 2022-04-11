import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {AuthParamList} from '../Types/NavigationParams';
import {createStackNavigator} from '@react-navigation/stack';
import VideoScreen from '../components/VideoScreen';
import AuthScreen from '../components/AuthScreen';
import {init} from '../services/authService';

export default function App() {
  const Stack = createStackNavigator<AuthParamList>();
  init();

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="AuthScreen" component={AuthScreen} />
        <Stack.Screen name="VideoScreen" component={VideoScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

// const StackNavigator = createStackNavigator(
//   {
//     AuthScreen: {
//       screen: AuthScreen,
//     },
//     VideoScreen:{
//       screen: VideoScreen
//     }
//   },
//   {
//     initialRouteName: 'AuthScreen',
//     headerMode: 'none',
//   },
// );

// export default createAppContainer(StackNavigator);
