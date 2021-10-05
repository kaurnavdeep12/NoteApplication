import {useNavigation} from '@react-navigation/core';
import {StackNavigationProp} from '@react-navigation/stack';
import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';

import {AuthParamList} from '../Types/NavigationParams';

import {Auth} from '../services';

const Congratulations = () => {
  type NavigationProp = StackNavigationProp<AuthParamList, 'NotesScreen'>;
  const navigation = useNavigation<NavigationProp>();
  const handleLogout = () => {
    Auth.signout();
    navigation.navigate('Login');
  };
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
        You have successfully Login!!
      </Text>
      <TouchableOpacity
        style={{
          backgroundColor: 'pink',
          height: 50,
          width: 200,
          borderRadius: 20,
          alignSelf: 'center',
          margin: 20,
        }}
        onPress={handleLogout}>
        <Text
          style={{
            alignSelf: 'center',
            padding: 10,
            fontWeight: 'bold',
            fontSize: 20,
          }}>
          Logout
        </Text>
      </TouchableOpacity>
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
