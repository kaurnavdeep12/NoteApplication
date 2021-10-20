/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useState} from 'react';
import {firebase} from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import {
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Platform,
  Button,
  ActivityIndicator,
  Image,
  Alert,
} from 'react-native';
import Config from '../utils/Config';
import {StackNavigationProp} from '@react-navigation/stack';
import {AuthParamList} from '../Types/NavigationParams';
import {useNavigation} from '@react-navigation/core';
import {useIsFocused} from '@react-navigation/native';
import {images} from '../utils';

interface Note {
  id: number;
  note: string;
}

const NotesScreen = () => {
  const isFocused = useIsFocused();
  const [isloading, setisLoading] = useState(true);
  const [input, setInput] = useState<any>('');
  const [list, setList] = useState<Array<any>>([]);
  const notesCollection = firebase.firestore().collection('AddNote');
  const db = firebase.firestore();

  type NavigationProp = StackNavigationProp<AuthParamList, 'NotesScreen'>;
  const navigation = useNavigation<NavigationProp>();

  const user = firebase.auth().currentUser;

  const AddNoteFirestore = () => {
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
    setInput('');
    getList();
  };

  useEffect(() => {
    setTimeout(() => {
      setisLoading(false);
    }, 3000);
    getList();
  }, [isFocused]);

  const getList = () => {
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
      });
  };

  const onItemClick = (item: any) => {
    navigation.navigate('NoteDetailScreen', {note: item.note});
  };

  const onDeletePress = (id: number) => {
    const del_Item = notesCollection.where('id', '==', id);
    del_Item.get().then(function (querySnapshot) {
      querySnapshot.forEach(function (doc) {
        doc.ref.delete();
      });
      getList();
    });
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
          <TouchableOpacity onPress={pressLogout}>
            <Image source={images.logout} style={styles.img_logout} />
          </TouchableOpacity>
          <View style={styles.tasksWrapper}>
            <Text style={styles.sectionTitle}>{Config.strings.add_note}</Text>
            <View style={styles.items}>
              {list.map((item, index) => {
                return (
                  <TouchableOpacity
                    key={index}
                    onPress={() => onItemClick(item)}>
                    <View style={styles.item}>
                      <View style={styles.itemLeft}>
                        <View style={styles.square} />
                        <Text style={styles.itemText}>{item.note}</Text>
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
        <TextInput
          style={styles.input}
          placeholder={'Please Enter Note'}
          value={input}
          onChangeText={text => setInput(text)}
        />
        <TouchableOpacity onPress={() => AddNoteFirestore()}>
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

    justifyContent: 'center',
    backgroundColor: 'white',
  },
  img_logout: {height: 40, width: 50, alignSelf: 'flex-end'},
  tasksWrapper: {
    paddingTop: 20,
    paddingHorizontal: 20,
    backgroundColor: 'grey',
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
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
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
