/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable curly */
/* eslint-disable no-shadow */
import React, {useEffect, useState} from 'react';
import {firebase} from '@react-native-firebase/firestore';
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
} from 'react-native';
import Config from '../utils/Config';
import {StackNavigationProp} from '@react-navigation/stack';
import {AuthParamList} from '../Types/NavigationParams';
import {useNavigation} from '@react-navigation/core';

interface Note {
  id: number;
  note: string;
}

const NotesScreen = () => {
  type NavigationProp = StackNavigationProp<AuthParamList, 'NotesScreen'>;
  const navigation = useNavigation<NavigationProp>();

  const [input, setInput] = useState<any>('');
  const [list, setList] = useState<Array<any>>([]);
  const notesCollection = firebase.firestore().collection('AddNote');
  const user = firebase.auth().currentUser;
  // console.log('user ======', user);

  // handle Add button
  const AddNote = () => {
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
    getList();
  }, []);

  const getList = () => {
    if (!user) {
      return;
    }
    const Items: Note[] = [];
    notesCollection
      .orderBy('userId', 'desc')
      .where('userId', '==', user.uid)
      .get()
      .then(snapshot => {
        snapshot.docs.forEach(doc => {
          if (doc.data().userId === user.uid)
            Items.push({
              id: doc.data().id,
              note: doc.data().note,
            });

          // setList(Items);
        });
        setList(Items);
      });
  };

  // navigate to next screen on the note Click
  const onItemClick = (item: any) => {
    navigation.navigate('NoteDetailScreen', {note: item.note});
  };

  return (
    <View style={styles.container}>
      <ScrollView
        // eslint-disable-next-line react-native/no-inline-styles
        contentContainerStyle={{
          flexGrow: 1,
        }}
        keyboardShouldPersistTaps="handled">
        <View style={styles.tasksWrapper}>
          <Text style={styles.sectionTitle}>{Config.strings.add_note}</Text>
          <View style={styles.items}>
            {list.map((item, index) => {
              console.log('item in notesscreen==', item);
              return (
                <TouchableOpacity key={index} onPress={() => onItemClick(item)}>
                  <View style={styles.item}>
                    <View style={styles.itemLeft}>
                      <View style={styles.square} />
                      <Text style={styles.itemText}>{item.note}</Text>
                    </View>
                    {/* <Button
                      title="X"
                      color="crimson"
                      onPress={() => {onDeletePress(item.id);}}
                    /> */}
                  </View>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>
      </ScrollView>

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.writeTaskWrapper}>
        <TextInput
          style={styles.input}
          placeholder={'Please Enter Note'}
          value={input}
          onChangeText={text => setInput(text)}
        />
        <TouchableOpacity onPress={() => AddNote()}>
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
  },
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
