import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import React from 'react';
import {StyleSheet, Text, View, Pressable, Alert} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Config from '../utils/Config';
import {AuthParamList} from '../Types/NavigationParams';
import {Header} from 'react-native-elements';

const NoteDetailScreen = () => {
  type NavigationProp = StackNavigationProp<AuthParamList, 'NoteDetailScreen'>;
  const navigation = useNavigation<NavigationProp>();
  const route = useRoute<RouteProp<AuthParamList, 'NoteDetailScreen'>>();

  const handleback = () => {
    navigation.navigate('NotesScreen');
  };

  return (
    <LinearGradient
      colors={['grey', 'white']}
      style={styles.container}
      start={{x: 0, y: 0}}
      end={{x: 1, y: 1}}>
      <Header
        leftComponent={{
          icon: '',
          color: '#fff',
          onPress: () => Alert.alert('Right icon Clicked'),
        }}
        centerComponent={{
          text: 'NoteApplication',
          style: {color: '#fff', fontSize: 22},
        }}
      />

      <View style={styles.container1}>
        <LinearGradient
          colors={['black', '#fff']}
          style={styles.linearGradient}>
          <View style={styles.view_two}>
            <Text style={styles.view_two_txt}>{route.params.note}</Text>
          </View>
        </LinearGradient>
        <Pressable onPress={handleback} style={styles.button}>
          <Text style={styles.back_txt}>{Config.strings.back}</Text>
        </Pressable>
      </View>
    </LinearGradient>
  );
};

export default NoteDetailScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: 'black',
    margin: 20,
    height: 50,
    width: 150,
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
    fontWeight: 'bold',
    fontFamily: Config.fonts.NOTOSERIF,
    backgroundColor: 'black',
    textAlign: 'center',
    color: 'white',
  },
  view_two: {
    height: 50,
    width: 250,
    opacity: 5,
  },
  view_two_txt: {
    color: 'purple',
    fontWeight: 'bold',
    fontFamily: Config.fonts.NOTOSERIF,
    textAlign: 'center',
    alignSelf: 'center',
    paddingTop: 10,
  },
  gradient_goback: {
    marginBottom: 100,
    left: 120,
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
  back_txt: {
    color: 'pink',
    fontSize: 20,
    fontWeight: 'bold',
  },
  button1: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: '#ADD8E6',
    margin: 20,
    height: 50,
    width: 150,
    bottom: 30,
  },
  next_txt: {
    color: 'black',
    fontSize: 20,
    fontWeight: 'bold',
  },
});
