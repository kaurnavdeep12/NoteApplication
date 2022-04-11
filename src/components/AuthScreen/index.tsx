import {useNavigation} from '@react-navigation/core';
import {StackNavigationProp} from '@react-navigation/stack';
import React, {PureComponent, useState} from 'react';
import {
  StyleSheet,
  SafeAreaView,
  View,
  StatusBar,
  Image,
  Text,
  ActivityIndicator,
  TouchableOpacity,
  Alert,
} from 'react-native';
import {users} from '../../config';
import {AuthService} from '../../services';
import {AuthParamList} from '../../Types/NavigationParams';
import {login_user} from '../../services/authService';

const AuthScreen = () => {
  const logoSrc = require('../../../assets/video_call.png');
  const [isLogging, setisLogging] = useState(false);
  type NavigationProp = StackNavigationProp<AuthParamList, 'AuthScreen'>;
  const navigation = useNavigation<NavigationProp>();

  // function login() {
  //   setisLogging(true);
  //   navigation.navigate('VideoScreen');
  // }
  // const login = (currentUser: any) => {
  //   const onSuccessLogin = () => {
  //     console.log('enter in success login')
  //     type NavigationProp = StackNavigationProp<AuthParamList, 'AuthScreen'>;
  //     const navigation = useNavigation<NavigationProp>();
  //     const opponentsIds = users
  //       .filter(opponent => opponent.id !== currentUser.id)
  //       .map(opponent => opponent.id);
  //       console.log('navigate=====>')

  //     navigation.navigate('VideoScreen', {opponentsIds});
  //   };

  //   const _onFailLogin = (error = {}) => {
  //     Alert.alert('Login Failed')
  //     Alert.alert(`Error.\n\n${JSON.stringify(error)}`);
  //   };
  //   setisLogging(true);
  //   console.log('currentUser======>', currentUser);
  //   login_user(currentUser)
  //     .then(onSuccessLogin)
  //     .catch(_onFailLogin)
  //     .then(() => setisLogging(false));
  // };

  const onSuccessLogin = (currentUser: any) => {
    // type NavigationProp = StackNavigationProp<AuthParamList, 'AuthScreen'>;
    // const navigation = useNavigation<NavigationProp>();
    const opponentsIds = users
      .filter(opponent => opponent.id !== currentUser.id)
      .map(opponent => opponent.id);
    navigation.navigate('VideoScreen', {opponentsIds});
  };

  const login = (currentUser: any) => {
    setisLogging(true);
    login_user(currentUser)
      .then(function onSuccessLogin() {
        const opponentsIds = users
          .filter(opponent => opponent.id !== currentUser.id)
          .map(opponent => opponent.id);
        console.log('opponentsIds in Authscreen=======>', opponentsIds);
        navigation.navigate('VideoScreen', {opponentsIds});
      })
      .catch(function (e) {
        console.log('caught an error', e);
      })
      .then(() => setisLogging(false));
    // onSuccessLogin(currentUser);
    // .then(onSuccessLogin(currentUser))
    // .catch(_onFailLogin)
    // .then(() => setisLogging(false));
  };
  return (
    <View style={[styles.container, styles.f1]}>
      <StatusBar backgroundColor="white" barStyle="dark-content" />
      <SafeAreaView style={[styles.centeredChildren, styles.f1]}>
        <Image resizeMode="contain" source={logoSrc} style={styles.logoImg} />
        <View
          style={[styles.f1, styles.centeredChildren, {flexDirection: 'row'}]}>
          <Text style={{fontSize: 20}}>
            {isLogging ? 'Connecting... ' : 'Start Video Chat'}
          </Text>
        </View>
      </SafeAreaView>
      <SafeAreaView style={[styles.authBtns, styles.f1]}>
        {users.map(user => (
          <TouchableOpacity key={user.id} onPress={() => login(user)}>
            <View style={[styles.authBtn, styles.centeredChildren]}>
              <Text style={styles.authBtnText}>{`Log in as ${user.name}`}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </SafeAreaView>
    </View>
  );
};
const styles = StyleSheet.create({
  f1: {
    flex: 1,
  },
  container: {
    backgroundColor: 'white',
  },
  centeredChildren: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1198d4',
    borderRadius: 10,
  },
  logoImg: {
    width: '90%',
    height: '80%',
  },
  authBtns: {
    justifyContent: 'flex-end',
    marginBottom: 20,
  },
  authBtn: {
    height: 50,
    borderRadius: 25,
    marginHorizontal: 25,
    marginVertical: 5,
  },
  authBtnText: {
    color: 'white',
    fontSize: 20,
    fontWeight: '700',
  },
});
export default AuthScreen;
