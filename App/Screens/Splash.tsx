import { useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { AuthParamList } from '../Types/NavigationParams';
import SplashScreen from 'react-native-splash-screen';
import auth from '@react-native-firebase/auth';

const Splash = () => {
  type NavigationProp = StackNavigationProp<AuthParamList, 'Splash'>;
  const navigation = useNavigation<NavigationProp>();

  useEffect(() => {
    if (auth().currentUser) {
      // navigate to dashboard
    } else
      navigation.navigate('Login');
    SplashScreen.hide();
  }, []);
  return null
};

export default Splash;
