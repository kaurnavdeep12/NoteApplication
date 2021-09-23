import React, {useState} from 'react';
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {AuthParamList} from '../Types/NavigationParams';
import {routeName} from '../utils/routeName';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import LinearGradient from 'react-native-linear-gradient';

import {
  Button,
  StyleSheet,
  Text,
  TextInput,
  View,
  FlatList,
  TouchableOpacity,
  Image,
} from 'react-native';
import Config from '../utils/Config';

// export interface SplashProps {
//   navigation: StackNavigationProp<AuthParamList, 'Splash'>;
// }

const Splash = () => {
  type NavigationProp = StackNavigationProp<AuthParamList, 'Splash'>;
  const navigation = useNavigation<NavigationProp>();
  const route = useRoute<RouteProp<AuthParamList, 'Splash'>>();

  return (
    <View style={{justifyContent: 'center', alignItems: 'center'}}>
      <Text>{Config.strings.splash_text}</Text>
      <LinearGradient
        start={{x: 0.0, y: 0.25}}
        end={{x: 0.5, y: 1.0}}
        locations={[0, 0.5, 0.6]}
        colors={['#4c669f', '#3b5998', '#192f6a']}
        style={{
          height: 50,
          width: 200,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Text style={{color: 'white', fontWeight: 'bold', fontSize: 20}}>
          Press
        </Text>
      </LinearGradient>
      <Button
        title="Navigate"
        color="crimson"
        onPress={() => navigation.navigate('NotesScreen')}
      />
    </View>
  );
};

export default Splash;
