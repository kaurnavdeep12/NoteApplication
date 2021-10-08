/* eslint-disable curly */

import React, {useState} from 'react';
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
  Input: string;
}

const NotesScreen = () => {
  type NavigationProp = StackNavigationProp<AuthParamList, 'NotesScreen'>;
  const navigation = useNavigation<NavigationProp>();
  const [Input, setInput] = useState('');
  
  const [InputItems, setInputItems] = useState<any[]>([]);

  const handleAddTask = () => {
    firebase.auth().currentUser;

    const addNote = {
      id: new Date().getTime(),
      Input,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
    };
    firebase.firestore().collection('AddNote').add(addNote);
    setInput('');
    getdbNotes();
  };

  const getdbNotes = () => {
    const db = firebase.firestore();

    // eslint-disable-next-line no-shadow
    const InputItems: Note[] = [];
    var user = firebase.auth().currentUser;
    console.log('user=====>', user);
    db.collection('AddNote')
      .orderBy('id', 'desc')
      .get()
      .then(snapshot => {
        snapshot.docs.forEach(doc => {
          console.log('doc in getData++++', doc);
          if (doc.data().userID === user?.uid)
            InputItems.push({
              id: doc.data().id,
              Input: doc.data().Input,
            });
          setInputItems(InputItems);
        });
      });
  };

  const onDeletePress = (id: any) => {
    const db = firebase.firestore();
    db.collection('AddNote')
      .where('id', '==', id)
      .get()
      .then(querySnapshot => {
        const documentId = querySnapshot.docs.map(doc => doc.id);
        let res = db.collection('AddNote').doc(documentId.toString()).delete();
        console.log('res+++++', res);
      });
  };

  const onItemClick = (item: any) => {
    navigation.navigate('NoteDetailScreen', {note: item.Input});
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
            {InputItems.map((item, index) => {
              console.log('item in notesscreen==', item);
              return (
                <TouchableOpacity key={index} onPress={() => onItemClick(item)}>
                  <View style={styles.item}>
                    <View style={styles.itemLeft}>
                      <View style={styles.square} />
                      <Text style={styles.itemText}>{item.Input}</Text>
                    </View>
                    <Button title="X" color="crimson" onPress={onDeletePress} />
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
          value={Input}
          onChangeText={text => setInput(text)}
        />
        <TouchableOpacity onPress={() => handleAddTask()}>
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
