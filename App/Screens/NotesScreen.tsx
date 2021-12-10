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
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {AuthParamList} from '../Types/NavigationParams';

const NotesScreen = () => {
  const dispatch = useDispatch();
  const list = useSelector(state => state.NoteReducers.list);

  type NavigationProp = StackNavigationProp<AuthParamList, 'NotesScreen'>;
  const navigation = useNavigation<NavigationProp>();

  const [toggleEditbtn, settoggleEditbtn] = useState(true);

  const [Input, setInput] = useState('');
  const [error, showError] = useState(false);
  const [isEditItem, setisEditItem] = useState(0);

  const onChangeNotes = (text: string) => {
    setInput(text);
  };

  const onAddButtonPress = () => {
    console.log('aaaaa+++');
    dispatch(addNote(Input)), setInput('');
  };

  const handleEditButton = (id: number) => {
    dispatch(editNote(id));
    settoggleEditbtn(false);
    setInput(list.data);
    setisEditItem(id);
  };

  const handleDeleteButton = (id: number) => {
    dispatch(deleteNote(id));
  };

  const handleDetail = (item: any) => {
    navigation.navigate('Login');
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
          </View>
        </View>
      </ScrollView>

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
    backgroundColor: '#E8EAED',
  },
  tasksWrapper: {
    paddingTop: 80,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 30,

    fontFamily: 'Inter-Bold',
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
    backgroundColor: 'blue',
    borderRadius: 60,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#C0C0C0',
    borderWidth: 2,
  },
  addText: {},
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
function alert(arg0: string) {
  throw new Error('Function not implemented.');
}
