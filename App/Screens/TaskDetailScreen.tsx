import React, {useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Config from '../utils/Config';
import {StackNavigationProp} from '@react-navigation/stack';
import {AuthParamList} from '../Types/NavigationParams';
import {useNavigation} from '@react-navigation/core';
import {startAddNotes, getNotesFirestore} from '../redux/actions';
import {useDispatch} from 'react-redux';
import {Header} from 'react-native-elements';

const TaskDetailScreen = () => {
  const dispatch = useDispatch();
  const [input, setInput] = useState<any>('');

  type NavigationProp = StackNavigationProp<AuthParamList, 'NotesScreen'>;
  const navigation = useNavigation<NavigationProp>();

  const AddNoteFirestore = () => {
    if (input === '') {
      Alert.alert('Please Enter Some text');
    } else {
      dispatch(startAddNotes(input));
      dispatch(getNotesFirestore());
      navigation.goBack();
    }
    setInput('');
  };

  function onImage() {
    navigation.navigate('ScanImageScreen');
  }

  return (
    <SafeAreaView style={styles.container}>
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

      <TextInput
        style={styles.txtInput}
        placeholder={'Enter your text here...'}
        multiline={true}
        textAlignVertical={'top'}
        value={input}
        onChangeText={text => setInput(text)}
      />

      <View style={styles.btn_container}>
        <TouchableOpacity onPress={AddNoteFirestore}>
          <LinearGradient style={styles.addbtn} colors={['#ADD8E6', '#728FCE']}>
            <Text style={styles.addtxt}>{Config.strings.add}</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
      <TouchableOpacity onPress={onImage}>
        <Text style={{alignSelf: 'center'}}>Image Crop Picker</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default TaskDetailScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    textAlign: 'center',
  },
  btn_container: {
    margin: 40,
    marginTop: 10,
  },

  txtInput: {
    height: 200,

    backgroundColor: 'white',
    borderRadius: 10,
    paddingHorizontal: 10,

    margin: 10,
    marginTop: 50,
    borderWidth: 2,
    borderColor: '#728FCE',
    fontSize: 20,
    fontWeight: 'bold',
  },
  main: {
    backgroundColor: 'white',
    paddingTop: 100,
    width: '100%',
  },
  addbtn: {
    height: 70,
    width: '100%',
    marginHorizontal: 15,
    right: 20,
    alignItems: 'center',

    borderRadius: 10,
  },
  addtxt: {
    textAlign: 'center',
    padding: 15,
    color: 'white',
    fontSize: 30,
    fontWeight: 'bold',
  },
  sideImage_Icon: {
    height: 68,
    width: 70,
    left: 22,
  },
});
