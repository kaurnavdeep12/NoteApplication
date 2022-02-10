import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {AuthParamList} from '../Types/NavigationParams';
import {createStackNavigator} from '@react-navigation/stack';
import UserList from '../components/UserList';
import DetailScreen from '../components/DetailScreen';
import {Provider} from 'react-redux';
import store from '../store';
export default function App() {
  const Stack = createStackNavigator<AuthParamList>();
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{headerShown: false}}>
          <Stack.Screen name="UserList" component={UserList} />
          <Stack.Screen name="DetailScreen" component={DetailScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
