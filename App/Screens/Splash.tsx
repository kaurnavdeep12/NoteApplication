import {useEffect} from 'react';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {AuthParamList} from '../Types/NavigationParams';
import {firebase} from '@react-native-firebase/auth';
import SplashScreen from 'react-native-splash-screen';
import {StyleSheet, View, Image} from 'react-native';
import {images} from '../utils';
import React from 'react';

const Splash = () => {
  type NavigationProp = StackNavigationProp<AuthParamList, 'Splash'>;
  const navigation = useNavigation<NavigationProp>();
  const user = firebase.auth().currentUser;

  useEffect(() => {
    setTimeout(() => {
      if (user) {
        navigation.navigate('NotesScreen');
      } else {
        navigation.navigate('VideoCallingScreen');
      }

      SplashScreen.hide();
    }, 200);
  }, []);

  return (
    <View style={styles.container}>
      <Image style={styles.image} source={images.notes} />
    </View>
  );
};

export default Splash;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'grey',
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 130,
    height: 130,
  },
});
