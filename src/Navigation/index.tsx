import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {AuthParamList} from '../Types/NavigationParams';
import {createStackNavigator} from '@react-navigation/stack';
import {Provider} from 'react-redux';
import store from '../store';
import SignupScreen from '../screens/SignupScreen';
import SplashScreen from '../screens/SplashScreen';
import SignInScreen from '../screens/SignInScreen';
import AnimationScreen from '../screens/AnimationScreen';
import AnimatedCarousel from '../screens/AnimatedCarousel';
import AnimatedFlatlist from '../screens/AnimatedFlatlist';
import AccordianScreen from '../screens/AccordianScreen';
import CollapsibleScreen from '../screens/CollapsibleScreen';

export default function App() {
  const Stack = createStackNavigator<AuthParamList>();
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{headerShown: false}}>
          <Stack.Screen name="SplashScreen" component={SplashScreen} />
          <Stack.Screen name="SignupScreen" component={SignupScreen} />
          <Stack.Screen name="SignInscreen" component={SignInScreen} />
          <Stack.Screen name="AnimationScreen" component={AnimationScreen} />
          <Stack.Screen name="AnimatedCarousel" component={AnimatedCarousel} />
          <Stack.Screen name="AnimatedFlatlist" component={AnimatedFlatlist} />
          <Stack.Screen name="AccordianScreen" component={AccordianScreen} />
          <Stack.Screen name="CollapsibleScreen" component={CollapsibleScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
