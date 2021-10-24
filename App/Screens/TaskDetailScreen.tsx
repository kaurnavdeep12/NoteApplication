import React, {useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  TouchableWithoutFeedback,
  Keyboard,
  TextInput,
  TouchableOpacity,
  Image,
  Alert,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {images} from '../utils/images';
import Config from '../utils/Config';
import {firebase} from '@react-native-firebase/firestore';
import {StackNavigationProp} from '@react-navigation/stack';
import {AuthParamList} from '../Types/NavigationParams';
import {useNavigation} from '@react-navigation/core';
import AsyncStorage from '@react-native-async-storage/async-storage';

const TaskDetailScreen = () => {
  const [input, setInput] = useState<any>('');
  const [list, setList] = useState<Array<any>>([]);
  const user = firebase.auth().currentUser;
  console.log('user in TaskDetailScreen', user);
  const notesCollection = firebase.firestore().collection('AddNote');
  const db = firebase.firestore();

  type NavigationProp = StackNavigationProp<AuthParamList, 'NotesScreen'>;
  const navigation = useNavigation<NavigationProp>();

  interface Note {
    id: number;
    note: string;
  }

  const AddNoteFirestore = () => {
    if (input === '') {
      Alert.alert('Please Enter Some Text');
    } else {
      if (!user) {
        return;
      }
      const addNote = {
        id: new Date().getTime(),
        note: input,
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        userId: user.uid,
      };

      notesCollection.add(addNote);
      console.log('notes added');
      setInput('');
      getList();
      navigation.goBack();
    }
  };

  const getList = () => {
    console.log('get called');
    if (!user) {
      return;
    }
    const Items: Note[] = [];
    db.collection('AddNote')
      .orderBy('userId', 'desc')
      .get()
      .then(snapshot => {
        snapshot.docs.forEach(doc => {
          if (doc.data().userId === user.uid) {
            Items.push({
              id: doc.data().id,
              note: doc.data().note,
            });
          }
        });
        setList(Items);
        check_list();
      });
  };

  const check_list = async () => {
    try {
      await AsyncStorage.setItem('Input', JSON.stringify(input));
    } catch (e) {
      Alert.alert('Failed to save the data to the storage');
    }
  };
  return (
    <SafeAreaView style={styles.container}>
      {/* <View style={styles.container}> */}
      <TextInput
        style={styles.txtInput}
        placeholder={'Enter your text here...'}
        multiline={true}
        textAlignVertical={'top'}
        value={input}
        onChangeText={text => setInput(text)}
      />

      <View
        style={{
          //   backgroundColor: 'gray',
          width: 340,
          height: 100,
          margin: 20,
          padding: 20,
          marginHorizontal: 10,
          //   flexDirection: 'row',
          marginTop: 15,
          justifyContent: 'center',
        }}>
        <LinearGradient style={styles.addbtn} colors={['#ADD8E6', '#728FCE']}>
          <Text style={styles.addtxt}>{Config.strings.add}</Text>
        </LinearGradient>
        {/* <Image style={styles.sideImage_Icon} source={images.add_icon} /> */}
      </View>
      {/* <LinearGradient style={styles.addbtn} colors={['#ADD8E6', '#728FCE']}>
        <Text style={styles.addtxt}>{Config.strings.add}</Text>
      </LinearGradient>
      <Image style={styles.sideImage_Icon} source={images.add_icon} /> */}
      {/* </View> */}
    </SafeAreaView>
  );
};

export default TaskDetailScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    textAlign: 'center',
    // backgroundColor: 'gray',
  },
  txtInput: {
    height: 200,
    // width: '100%',
    backgroundColor: 'white',
    borderRadius: 10,
    paddingHorizontal: 10,
    // marginLeft: 20,
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

    // marginLeft: 0,
    // marginTop: 15,
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
    // alignItems: 'flex-end',
    // right: 5,
    // position: 'absolute',
    // bottom: 0,
  },
});
