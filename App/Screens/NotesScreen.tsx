import React, {useEffect, useState} from 'react';
import {firebase} from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import {getIcons} from '../assets/icons';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  Alert,
} from 'react-native';
import Config from '../utils/Config';
import {StackNavigationProp} from '@react-navigation/stack';
import {AuthParamList} from '../Types/NavigationParams';
import {useNavigation} from '@react-navigation/core';
import {useIsFocused} from '@react-navigation/native';
import {getNotesFirestore, deleteNotes} from '../redux/actions';
import {useDispatch, useSelector} from 'react-redux';
import {FloatingAction} from 'react-native-floating-action';

import {Header} from 'react-native-elements';
import {AppStates} from '../redux/reducer';

const NotesScreen = () => {
  firebase.auth().currentUser;
  const isFocused = useIsFocused();
  const dispatch = useDispatch();
  const [isloading, setisLoading] = useState(true);

  // for Navigation
  type NavigationProp = StackNavigationProp<AuthParamList, 'NotesScreen'>;
  const navigation = useNavigation<NavigationProp>();
  // fetch data from store
  const note = useSelector((state: AppStates) => state.noteReducers);

  const actions = [
    {
      text: 'Add notes',
      icon: require('../assets/notepad.png'),
      name: 'Add Notes',
      position: 2,
    },
  ];

  useEffect(() => {
    setTimeout(() => {
      setisLoading(false);
    }, 3000);
    dispatch(getNotesFirestore());
  }, [isFocused]);

  const onItemClick = (item: any) => {
    navigation.navigate('NoteDetailScreen', {note: item.value});
  };

  const ClickAddbtn = () => {
    navigation.navigate('TaskDetailScreen');
  };

  const onDeletePress = (id: number) => {
    dispatch(deleteNotes(id));
    dispatch(getNotesFirestore());
  };

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

  return (
    <View style={styles.container}>
      {isloading ? (
        <ActivityIndicator size="large" color="red" />
      ) : (
        <ScrollView
          contentContainerStyle={styles.scroll}
          keyboardShouldPersistTaps="handled">
          <Header
            leftComponent={{
              icon: 'menu',
              color: '#fff',
              onPress: () => Alert.alert('Right icon Clicked'),
            }}
            centerComponent={{
              text: 'NoteApplication',
              style: {color: '#fff', fontSize: 22},
            }}
            rightComponent={{
              icon: 'logout',
              color: '#fff',
              onPress: () => pressLogout(),
            }}
          />

          <View style={styles.tasksWrapper}>
            <View style={styles.items}>
              {note.length > 0 &&
                note.map((item, index) => {
                  return (
                    <TouchableOpacity
                      key={index}
                      onPress={() => onItemClick(item)}>
                      <View style={styles.item}>
                        <View style={styles.itemLeft}>
                          <View style={styles.square} />
                          <Text style={styles.itemText}>{item.value}</Text>
                        </View>
                        <TouchableOpacity
                          onPress={() => {
                            onDeletePress(item.id);
                          }}>
                          {getIcons('DELETE_ICON', 40)}
                        </TouchableOpacity>
                      </View>
                    </TouchableOpacity>
                  );
                })}
            </View>
          </View>
        </ScrollView>
      )}

      <FloatingAction actions={actions} onPressItem={ClickAddbtn} />
    </View>
  );
};
export default NotesScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,

    justifyContent: 'center',
  },
  img_logout: {height: 40, width: 50, alignSelf: 'flex-end'},
  tasksWrapper: {
    paddingTop: 10,
    paddingHorizontal: 20,
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
    bottom: 60,

    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'stretch',

    right: 0,
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
    backgroundColor: 'white',
    alignItems: 'stretch',
    borderRadius: 80,
    flexDirection: 'column',

    borderColor: '#C0C0C0',
  },
  addText: {fontSize: 40},

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
