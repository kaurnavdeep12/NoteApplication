import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {AuthParamList} from '../Types/NavigationParams';
import {createStackNavigator} from '@react-navigation/stack';
import UserList from '../screens/UserList';
import DetailScreen from '../screens/DetailScreen';
import {Provider} from 'react-redux';
import store from '../store';
import ReanimatedBottomsheet from '../screens/ReanimatedBottomsheet';
import SignupScreen from '../screens/SignupScreen';
import ProfileScreen from '../screens/ProfileScreen';
import EditProfileScreen from '../screens/EditProfileScreen';
import ShadowCardScreen from '../screens/ShadowCardScreen';
import SplashScreen from '../screens/SplashScreen';
import SignInScreen from '../screens/SignInScreen';
import HomeScreen from '../screens/HomeScreen';
import ChatScreen from '../screens/ChatScreen';

export default function App() {
  const Stack = createStackNavigator<AuthParamList>();
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{headerShown: false}}>
          <Stack.Screen name="SplashScreen" component={SplashScreen} />
          <Stack.Screen name="SignupScreen" component={SignupScreen} />
          <Stack.Screen name="SignInscreen" component={SignInScreen} />
          <Stack.Screen name="HomeScreen" component={HomeScreen} />
          {/* <Stack.Screen name="UserList" component={UserList} />
          <Stack.Screen name="DetailScreen" component={DetailScreen} />
          <Stack.Screen
            name="ReanimatedBottomsheet"
            component={ReanimatedBottomsheet}></Stack.Screen> */}
          <Stack.Screen name="ProfileScreen" component={ProfileScreen} />
          <Stack.Screen
            name="EditProfileScreen"
            component={EditProfileScreen}
          />
          <Stack.Screen name="ShadowCardScreen" component={ShadowCardScreen} />
          <Stack.Screen name="ChatScreen" component={ChatScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
