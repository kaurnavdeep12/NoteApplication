import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  Alert,
  Button,
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  Platform,
  TouchableOpacity,
  View,
} from 'react-native';

import auth from '@react-native-firebase/auth';
import Config from '../utils/Config';
import {StackNavigationProp} from '@react-navigation/stack';
import {AuthParamList} from '../Types/NavigationParams';
import {useNavigation} from '@react-navigation/core';
import {FloatingAction} from 'react-native-floating-action';
import {Header} from 'react-native-elements';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {startAddNotes, getNotesFirestore, deleteNotes} from '../redux/actions';
import {useDispatch, useSelector} from 'react-redux';
import {useIsFocused} from '@react-navigation/native';
import {AppStates} from '../redux/reducer';

const NotesScreen = () => {
  type NavigationProp = StackNavigationProp<AuthParamList, 'NotesScreen'>;
  const navigation = useNavigation<NavigationProp>();
  const [isloading, setisLoading] = useState(true);
  const isFocused = useIsFocused();
  const dispatch = useDispatch();
  const note = useSelector((state: AppStates) => state.noteReducers);
  console.log('note ===== in notesScreen', note);
  useEffect(() => {
    setTimeout(() => {
      setisLoading(false);
    }, 3000);
    dispatch(getNotesFirestore());
  }, [isFocused]);

  const onDeletePress = (id: number) => {
    dispatch(deleteNotes(id));
    dispatch(getNotesFirestore());
  };

  const actions = [
    {
      text: 'Add Notes',
      icon: require('../assets/notepad.png'),
      name: 'bt_accessibility',
      position: 2,
    },
  ];

  const handleLogout = async () => {
    await auth().signOut();
    navigation.navigate('Login');
  };

  const pressLogout = async () => {
    Alert.alert(
      'NoteApp',
      'Do you really want to Logout?',
      [
        {text: 'Cancel', style: 'cancel'},
        {
          text: 'OK',
          onPress: () => {
            handleLogout();
          },
        },
      ],
      {cancelable: false},
    );
  };

  const onclickbtn = () => {
    // Alert.alert('aaaa');
    navigation.navigate('TaskDetailScreen');
  };

  return (
    <View style={styles.container}>
      <Header
        leftComponent={{
          icon: 'menu',
          color: '#fff',
          onPress: () => Alert.alert('Right icon Clicked'),
        }}
        centerComponent={{
          text: 'NoteApplication',
          style: {color: '#fff', fontSize: 24},
        }}
        rightComponent={{
          icon: 'logout',
          color: '#fff',
          onPress: () => pressLogout(),
        }}
      />
      {/* <Text>Floating Action example</Text>
      <FloatingAction actions={actions} onPressItem={onclickbtn} /> */}

      {isloading ? (
        <ActivityIndicator size="large" color="red" />
      ) : (
        <ScrollView
          contentContainerStyle={styles.scroll}
          keyboardShouldPersistTaps="handled">
          <View style={styles.tasksWrapper}>
            <View style={styles.items}>
              {note.length &&
                note.map((item, index) => {
                  return (
                    <TouchableOpacity
                      key={index}
                      // onPress={() => onItemClick(item)}
                    >
                      <View style={styles.item}>
                        <View style={styles.itemLeft}>
                          <View style={styles.square} />
                          <Text style={styles.itemText}>{item.value}</Text>
                        </View>
                        <Button
                          title="X"
                          color="crimson"
                          onPress={() => {
                            onDeletePress(item.id);
                          }}
                        />
                      </View>
                    </TouchableOpacity>
                  );
                })}
            </View>
          </View>
        </ScrollView>
      )}
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.writeTaskWrapper}>
        {/* <TextInput style={styles.input} placeholder={'Please Enter Note'} /> */}
        <TouchableOpacity onPress={onclickbtn}>
          <View style={styles.addWrapper}>
            <Text style={styles.addText}>+</Text>
          </View>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </View>
  );
};
export default NotesScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,

    // justifyContent: 'center',
    backgroundColor: 'white',
  },
  img_logout: {height: 40, width: 50, alignSelf: 'flex-end'},
  tasksWrapper: {
    paddingTop: 10,
    paddingHorizontal: 20,
    backgroundColor: '#fff',
  },
  sectionTitle: {
    fontSize: 25,
    fontWeight: 'bold',
    fontFamily: Config.fonts.NOTOSERIF,
  },
  items: {
    marginTop: 30,
  },
  writeTaskWrapper: {
    position: 'absolute',
    bottom: 0,
    width: 250,
    marginLeft: 50,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#55BCF6',
    borderRadius: 20,
  },
  input: {
    paddingVertical: 15,
    paddingHorizontal: 15,
    backgroundColor: '#FFF',
    borderRadius: 60,
    borderColor: '#C0C0C0',
    borderWidth: 3,
    width: 250,
  },
  addWrapper: {
    width: 60,
    height: 60,
    backgroundColor: '#FFF',
    borderRadius: 60,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#C0C0C0',
    borderWidth: 3,
  },
  addText: {fontSize: 20},

  item: {
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
    borderWidth: 2,
  },
  itemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  square: {
    width: 24,
    height: 24,
    backgroundColor: '#55BCF6',
    opacity: 0.4,
    borderRadius: 5,
    marginRight: 15,
  },
  itemText: {
    maxWidth: '80%',
    fontWeight: 'bold',
    fontFamily: Config.fonts.NOTOSERIF,
  },
  circular: {
    width: 12,
    height: 12,
    borderColor: '#55BCF6',
    borderWidth: 2,
    borderRadius: 5,
  },
  scroll: {
    flexGrow: 1,
  },
});
