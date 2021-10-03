import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  FlatList,
  ScrollView,
  Button,
  AppState,
} from 'react-native';

import {useDispatch, useSelector} from 'react-redux';
import {
  startAddNotes,
  deleteNotes,
  Note,
  getAddedNotes,
} from '../redux/actions';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {AuthParamList} from '../Types/NavigationParams';
import {ItemClick} from 'native-base/lib/typescript/components/composites/Typeahead/useTypeahead/types';

const NotesScreen = () => {
  const dispatch = useDispatch();
  // const list = useSelector(state => state);

  const note = useSelector((state: AppState) => state.noteReducers);
  console.log('note in notesscreen',note);

  type NavigationProp = StackNavigationProp<AuthParamList, 'NotesScreen'>;
  const navigation = useNavigation<NavigationProp>();

  //edit button toggle

  // States
  const [Input, setInput] = useState('');

  // Set Input field
  const onChangeNotes = (text: string) => {
    setInput(text);
    // showError(false);
  };

  // On the press of button add notes
  const onAddButtonPress = async () => {
    await dispatch(startAddNotes(Input));
    dispatch(getAddedNotes());

    // dispatch(getAddedNotes());
  };

  // On the Edit Button Press
  // const handleEditButton = (id: number) => {
  //   dispatch(editNote(id));
  //   settoggleEditbtn(false);
  //   setInput(list.data);
  //   setisEditItem(id);
  // };

  //On the Delete Button Press
  // const handleDeleteButton = (id: number) => {
  //   dispatch(deleteNotes(id));
  // };

  // const handleDetail = (item: any) => {
  //   navigation.navigate('NoteDetailScreen', {note: item.data});
  //   // navigation.navigate('Login');
  // };

  const renderItems = ({item}: any) => {
    return (
      <TouchableOpacity>
        <View style={styles.item}>
          <View style={styles.itemLeft}>
            <View style={styles.square}></View>
            <Text style={styles.itemText}>{item.value}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
        }}
        keyboardShouldPersistTaps="handled">
        <View style={styles.tasksWrapper}>
          <Text style={styles.sectionTitle}>Notes App</Text>
          <View style={styles.items}>
            <FlatList
              data={note}
              showsHorizontalScrollIndicator={false}
              keyExtractor={item => item.id.toString()}
              renderItem={({item}: {item: Note}) => (
                <Text style={{color: 'red', margin: 20}}>{item.value}</Text>
              )}
            />
          </View>
        </View>
      </ScrollView>

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.writeTaskWrapper}>
        {/* <Text>{note}</Text> */}
        <TextInput
          style={styles.input}
          placeholder={'Write a task'}
          value={Input}
          onChangeText={onChangeNotes}
        />
        <TouchableOpacity onPress={onAddButtonPress}>
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
    backgroundColor: 'white',
  },
  tasksWrapper: {
    paddingTop: 80,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#fff',
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
    backgroundColor: 'grey',
    borderRadius: 60,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#C0C0C0',
    borderWidth: 2,
  },
  addText: {fontWeight: 'bold', fontSize: 30},
  item: {
    backgroundColor: 'grey',
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
