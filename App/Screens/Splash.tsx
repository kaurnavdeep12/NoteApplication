import React, {useEffect, useState} from 'react';
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {AuthParamList} from '../Types/NavigationParams';
import {images} from '../utils/images';
import SplashScreen from 'react-native-splash-screen';

import {View, StyleSheet, ImageBackground, Image} from 'react-native';

const Splash = () => {
  type NavigationProp = StackNavigationProp<AuthParamList, 'Splash'>;
  const navigation = useNavigation<NavigationProp>();
  const route = useRoute<RouteProp<AuthParamList, 'Splash'>>();

  useEffect(() => {
    setTimeout(() => {
      navigation.navigate('NotesScreen');
      SplashScreen.hide();
    }, 200);
  }, []);

  return (
    <View style={styles.container}>
      <ImageBackground
        source={images.Splash}
        style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Image source={images.SplashNew} />
      </ImageBackground>
    </View>
  );
};

export default Splash;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'grey',
  },
});
