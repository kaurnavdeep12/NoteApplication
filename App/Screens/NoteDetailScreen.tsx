import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import LinearGradient from 'react-native-linear-gradient';
import Config from '../utils/Config';

import {AuthParamList} from '../Types/NavigationParams';

const NoteDetailScreen = () => {
  type NavigationProp = StackNavigationProp<AuthParamList, 'NoteDetailScreen'>;
  const navigation = useNavigation<NavigationProp>();
  const route = useRoute<RouteProp<AuthParamList, 'NoteDetailScreen'>>();

  const handleGoBack = () => {
    navigation.navigate('NotesScreen');
  };

  return (
    <LinearGradient
      colors={['purple', 'white']}
      style={styles.container}
      start={{x: 0, y: 0}}
      end={{x: 1, y: 1}}>
      <View style={styles.view_one}>
        <Text style={styles.view_one_txt}>{Config.strings.scr_heading}</Text>
      </View>
      <View style={styles.container1}>
        <LinearGradient
          colors={['#24C6DC', '#fff']}
          style={styles.linearGradient}>
          <View style={styles.view_two}>
            <Text style={styles.view_two_txt}>{route.params.note}</Text>
          </View>
        </LinearGradient>
      </View>
      <TouchableOpacity onPress={handleGoBack}>
        <LinearGradient
          colors={['purple', '#24C6DC', '#fff']}
          style={styles.gradient_goback}>
          <Text style={styles.gradient_goback_txt}>
            {Config.strings.go_back}
          </Text>
        </LinearGradient>
      </TouchableOpacity>
    </LinearGradient>
  );
};

export default NoteDetailScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  container1: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  linearGradient: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    borderWidth: 2,
    height: 200,
    width: 350,
    elevation: 20,
  },
  view_one: {backgroundColor: '#fff', height: 35},
  view_one_txt: {
    fontSize: 25,
    backgroundColor: 'black',
    textAlign: 'center',
    color: 'white',
  },
  view_two: {
    backgroundColor: '#fff',
    height: 50,
    width: 250,
    opacity: 5,
  },
  view_two_txt: {
    color: 'purple',
    fontWeight: 'bold',
    textAlign: 'center',
    alignSelf: 'center',
    paddingTop: 10,
  },
  gradient_goback: {
    marginBottom: 100,
    left: 80,
    height: 50,
    width: 200,
    elevation: 10,
    borderRadius: 10,
    borderWidth: 2,
  },
  gradient_goback_txt: {
    textAlign: 'center',
    paddingTop: 15,
    fontWeight: 'bold',
  },
});
