/* eslint-disable react-native/no-inline-styles */
import {useNavigation} from '@react-navigation/core';
import {StackNavigationProp} from '@react-navigation/stack';
import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import auth from '@react-native-firebase/auth';
import {AuthParamList} from '../Types/NavigationParams';
import Config from '../utils/Config';

const HomeScreen = () => {
  type NavigationProp = StackNavigationProp<AuthParamList, 'NotesScreen'>;
  const navigation = useNavigation<NavigationProp>();
  const handleLogout = async () => {
    const response = await auth().signOut();
    console.log('response of Logout ', response);
    navigation.navigate('Login');
  };
  return (
    <View style={styles.container}>
      <Text style={styles.txt}>{Config.strings.welcome}</Text>
      <Text style={styles.txt1}>{Config.strings.success_login}</Text>
      <TouchableOpacity style={styles.logout_btn} onPress={handleLogout}>
        <Text style={styles.logout_btn_txt}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
};

export default HomeScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
    paddingHorizontal: 20,
    backgroundColor: 'grey',
    justifyContent: 'center',
  },
  txt: {
    color: 'purple',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 35,
  },
  txt1: {
    color: 'purple',
    textAlign: 'center',
    fontSize: 18,
  },
  logout_btn: {
    backgroundColor: 'pink',
    height: 50,
    width: 200,
    borderRadius: 20,
    alignSelf: 'center',
    margin: 20,
  },
  logout_btn_txt: {
    alignSelf: 'center',
    padding: 10,
    fontWeight: 'bold',
    fontSize: 20,
  },
});
