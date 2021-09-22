import React, {useState} from 'react';
import {
  Button,
  StyleSheet,
  Text,
  TextInput,
  View,
  FlatList,
  TouchableOpacity,
  Image,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {addNote, deleteNote, editNote} from '../redux/actions';
import Config from '../utils/Config';

const NotesScreen = () => {
  const dispatch = useDispatch();
  const list = useSelector(state => state.NoteReducers.list);

  //edit button toggle
  const [toggleEditbtn, settoggleEditbtn] = useState<boolean>(true);

  // States
  const [Input, setInput] = useState<string>('');
  const [error, showError] = useState<Boolean>(false);
  const [isEditItem, setisEditItem] = useState<string>('');

  // Set Input field
  const onChangeNotes = (text: string) => {
    setInput(text);
    showError(false);
  };

  // On the press of button add notes
  const onAddButtonPress = () => {
    dispatch(addNote(Input)), setInput('');
  };

  // On the Edit Button Press
  const handleEditButton = (id: any) => {
    console.log('id+++++', id);
    dispatch(editNote(id));
    settoggleEditbtn(false);
    setInput(list.data);
    setisEditItem(id);
  };

  //On the Delete Button Press
  const handleDeleteButton = (id: any) => {
    console.log('id in Delete function++++', id);
    console.log('list in delete', list);
    dispatch(deleteNote(id));
  };

  const renderItems = ({item}) => {
    return (
      <View style={styles.listItem} key={item.id}>
        <Text style={[styles.task]}>{item.data}</Text>

        <Button title="Edit" onPress={() => handleEditButton(item.id)} />

        <Button
          title="X"
          color="crimson"
          onPress={() => handleDeleteButton(item.id)}
        />
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{Config.strings.heading_text}</Text>
      <View style={styles.inputWrapper}>
        <TextInput
          placeholder={Config.strings.placehoder_text}
          value={Input}
          onChangeText={onChangeNotes}
          style={styles.inputBox}
        />
      </View>
      {toggleEditbtn ? (
        <TouchableOpacity style={styles.btn} onPress={onAddButtonPress}>
          <Text style={{textAlign: 'center', fontSize: 20}}>Add Note</Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity style={styles.btn} onPress={handleEditButton}>
          <Text style={{textAlign: 'center', fontSize: 20}}>Edit Note</Text>
        </TouchableOpacity>
      )}

      {/* <Button title="Add Note" onPress={onButtonPress} /> */}
      {error && <Text style={styles.error}>{Config.strings.error_text}</Text>}
      <Text style={styles.subtitle}>{Config.strings.sub_title}</Text>
      {list.length === 0 && <Text>{Config.strings.helping_text}</Text>}
      <View style={{}}>
        <FlatList
          data={list}
          showsHorizontalScrollIndicator={false}
          keyExtractor={item => item.id.toString()}
          renderItem={renderItems}
        />
      </View>
    </View>
  );
};

export default NotesScreen;
const styles = StyleSheet.create({
  container: {
    padding: 35,
    alignItems: 'center',
  },
  inputWrapper: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,

    borderRadius: 20,
  },
  btn: {
    backgroundColor: 'grey',
    height: 50,
    width: 150,
    borderRadius: 20,
    justifyContent: 'center',
  },

  inputBox: {
    width: '100%',
    borderColor: 'purple',
    borderRadius: 8,
    borderWidth: 2,
    paddingLeft: 8,
    borderRadius: 20,
  },
  title: {
    fontSize: 40,
    marginBottom: 40,
    fontWeight: 'bold',
    textDecorationLine: 'underline',
  },
  subtitle: {
    fontSize: 20,
    marginBottom: 20,
    color: 'purple',
  },
  listItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    marginBottom: 10,
    backgroundColor: 'grey',
  },
  addButton: {
    alignItems: 'flex-end',
  },
  task: {
    width: 200,
  },
  error: {
    color: 'red',
  },
});
