import {useEffect} from 'react';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {AuthParamList} from '../Types/NavigationParams';
import auth from '@react-native-firebase/auth';
import SplashScreen from 'react-native-splash-screen';

import {StyleSheet} from 'react-native';

const Splash = () => {
  type NavigationProp = StackNavigationProp<AuthParamList, 'Splash'>;
  const navigation = useNavigation<NavigationProp>();

  useEffect(() => {
    if (auth().currentUser) {
      navigation.navigate('Congratulations');
    } else {
      navigation.navigate('Login');
      SplashScreen.hide();
    }
  }, []);
  return null;
};

export default Splash;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'grey',
  },
});
