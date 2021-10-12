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
  // For Navigation
  type NavigationProp = StackNavigationProp<AuthParamList, 'NotesScreen'>;
  const navigation = useNavigation<NavigationProp>();
  // For get Current User
  const user = firebase.auth().currentUser;
  // Store/Add  Note In FireStore Database
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

  //get Note List from Firestore when user render on screen
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
          if (doc.data().userId == user.uid)
            Items.push({
              id: doc.data().id,
              note: doc.data().note,
            });
        });
        setList(Items);
      });
  };

  // navigate to next screen on the noteItem Click
  const onItemClick = (item: any) => {
    navigation.navigate('NoteDetailScreen', {note: item.note});
  };

  // NoteItem Delete when user will press on Delete Icon
  const onDeletePress = (id: number) => {
    const del_Item = notesCollection.where('id', '==', id);
    del_Item.get().then(function (querySnapshot) {
      querySnapshot.forEach(function (doc) {
        doc.ref.delete();
      });
      getList();
    });
  };

  // User Logout from the App when User will Press the Logout Icon from top of the Screen
  const handleLogout = async () => {
    await auth().signOut();
    navigation.navigate('Login');
  };

  return (
    <View style={styles.container}>
      {isloading ? (
        <ActivityIndicator size="large" color="red" />
      ) : (
        <ScrollView
          contentContainerStyle={{
            flexGrow: 1,
          }}
          keyboardShouldPersistTaps="handled">
          <TouchableOpacity onPress={handleLogout}>
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
    backgroundColor: '#E8EAED',
    justifyContent: 'center',
  },
  img_logout: {height: 40, width: 50, alignSelf: 'flex-end'},
  tasksWrapper: {
    paddingTop: 80,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
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
    borderWidth: 1,
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
    borderWidth: 1,
  },
  addText: {},

  item: {
    backgroundColor: 'pink',
    padding: 15,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
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
  },
  circular: {
    width: 12,
    height: 12,
    borderColor: '#55BCF6',
    borderWidth: 2,
    borderRadius: 5,
  },
});
