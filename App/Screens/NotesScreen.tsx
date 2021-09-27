import React, {useState} from 'react';
import {
  Button,
  StyleSheet,
  Text,
  TextInput,
  View,
  FlatList,
  TouchableOpacity,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {addNote, deleteNote, editNote} from '../redux/actions';
import Config from '../utils/Config';
import LinearGradient from 'react-native-linear-gradient';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {AuthParamList} from '../Types/NavigationParams';
// import Task from '../components/Task';
const NotesScreen = () => {
  const dispatch = useDispatch();
  const list = useSelector(state => state.NoteReducers.list);

  type NavigationProp = StackNavigationProp<AuthParamList, 'NotesScreen'>;
  const navigation = useNavigation<NavigationProp>();

  //edit button toggle
  const [toggleEditbtn, settoggleEditbtn] = useState(true);

  // States
  const [Input, setInput] = useState('');
  const [error, showError] = useState(false);
  const [isEditItem, setisEditItem] = useState(0);

  // Set Input field
  const onChangeNotes = (text: string) => {
    setInput(text);
    // showError(false);
  };

  // On the press of button add notes
  const onAddButtonPress = () => {
    console.log('aaaaa+++');
    dispatch(addNote(Input)), setInput('');
  };

  // On the Edit Button Press
  const handleEditButton = (id: number) => {
    dispatch(editNote(id));
    settoggleEditbtn(false);
    setInput(list.data);
    setisEditItem(id);
  };

  //On the Delete Button Press
  const handleDeleteButton = (id: number) => {
    dispatch(deleteNote(id));
  };

  const handleDetail = (item: any) => {
    navigation.navigate('NoteDetailScreen', {note: item.data});
    // navigation.navigate('Login');
  };

  const renderItems = ({item}: any) => {
    return (
      <TouchableOpacity
        onPress={() => {
          handleDetail(item);
        }}>
        <View style={styles.item}>
          <View style={styles.itemLeft}>
            <View style={styles.square}></View>
            <Text style={styles.itemText}>{item.data}</Text>
          </View>
          <Button
            title="X"
            color="crimson"
            onPress={() => handleDeleteButton(item.id)}
          />
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      {/* Added this scroll view to enable scrolling when list gets longer than the page */}
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
        }}
        keyboardShouldPersistTaps="handled">
        {/* Today's Tasks */}
        <View style={styles.tasksWrapper}>
          <Text style={styles.sectionTitle}>Notes App</Text>
          <View style={styles.items}>
            <FlatList
              data={list}
              showsHorizontalScrollIndicator={false}
              keyExtractor={item => item.id.toString()}
              renderItem={renderItems}
            />
            {/* This is where the tasks will go! */}
            {/* {list.map((item: string, index: number) => {
              return (
                <TouchableOpacity key={index}>
                  <Task text={item} />
                </TouchableOpacity>
              );
            })} */}
          </View>
        </View>
      </ScrollView>

      {/* Write a task */}
      {/* Uses a keyboard avoiding view which ensures the keyboard does not cover the items on screen */}
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.writeTaskWrapper}>
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
    backgroundColor: 'black',
  },
  tasksWrapper: {
    paddingTop: 80,
    paddingHorizontal: 20,
    // backgroundColor: 'grey',
  },
  sectionTitle: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#fff',
  },
  items: {
    marginTop: 30,
    // backgroundColor: 'pink',
  },
  writeTaskWrapper: {
    position: 'absolute',
    bottom: 60,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    // backgroundColor: 'orange',
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
    // backgroundColor: 'pink',
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
function alert(arg0: string) {
  throw new Error('Function not implemented.');
}
