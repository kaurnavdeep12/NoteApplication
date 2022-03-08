import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {AuthParamList} from '../Types/NavigationParams';
import {createStackNavigator} from '@react-navigation/stack';
import UserList from '../screens/UserList';
import DetailScreen from '../screens/DetailScreen';
import {Provider} from 'react-redux';
import store from '../store';
import ReanimatedBottomsheet from '../screens/ReanimatedBottomsheet';
export default function App() {
  const Stack = createStackNavigator<AuthParamList>();
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{headerShown: false}}>
          <Stack.Screen name="UserList" component={UserList} />
          <Stack.Screen name="DetailScreen" component={DetailScreen} />
          <Stack.Screen
            name="ReanimatedBottomsheet"
            component={ReanimatedBottomsheet}></Stack.Screen>
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
