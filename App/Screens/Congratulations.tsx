import {useNavigation} from '@react-navigation/core';
import {StackNavigationProp} from '@react-navigation/stack';
import React, {useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  StatusBar,
  Keyboard,
  TouchableWithoutFeedback,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import SplashScreen from 'react-native-splash-screen';
import {AuthParamList} from '../Types/NavigationParams';
import {images} from '../utils';

const Congratulations = () => {
  type NavigationProp = StackNavigationProp<AuthParamList, 'Splash'>;
  const navigation = useNavigation<NavigationProp>();
  useEffect(() => {
    setTimeout(() => {
      navigation.navigate('Login');
      SplashScreen.hide();
    }, 400);
  }, []);
  return (
    <View style={styles.container}>
      <Text
        style={{
          color: 'purple',
          textAlign: 'center',
          fontWeight: 'bold',
          fontSize: 35,
        }}>
        Congratulations!!
      </Text>
      <Text style={{color: 'purple', textAlign: 'center', fontSize: 18}}>
        You have successfully Registered
      </Text>
    </View>
  );
};

export default Congratulations;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
    paddingHorizontal: 20,
    backgroundColor: 'grey',
    justifyContent: 'center',
  },
});
