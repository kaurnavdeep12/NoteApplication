import React, {useState} from 'react';
import {
  Button,
  StyleSheet,
  Text,
  TextInput,
  View,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {addNote, deleteNote, editNote} from '../redux/actions';
import Config from '../utils/Config';
import LinearGradient from 'react-native-linear-gradient';
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {AuthParamList} from '../Types/NavigationParams';

const NotesScreen = ({props}) => {
  const dispatch = useDispatch();
  const list = useSelector(state => state.NoteReducers.list);

  type NavigationProp = StackNavigationProp<AuthParamList, 'Splash'>;
  const navigation = useNavigation<NavigationProp>();
  const route = useRoute<RouteProp<AuthParamList, 'Splash'>>();

  //edit button toggle
  const [toggleEditbtn, settoggleEditbtn] = useState(true);

  // States
  const [Input, setInput] = useState('');
  const [error, showError] = useState(false);
  const [isEditItem, setisEditItem] = useState(0);

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

  const handleDetail = () => {
    navigation.navigate('NoteDetailScreen');
  };

  const renderItems = ({item}) => {
    return (
      <TouchableOpacity onPress={handleDetail}>
        <View style={styles.listItem} key={item.id}>
          <Text style={[styles.task]}>{item.data}</Text>

          <Button title="Edit" onPress={() => handleEditButton(item.id)} />

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
        <TouchableOpacity style={styles.gradient} onPress={onAddButtonPress}>
          <LinearGradient
            colors={['#24C6DC', '#514A9D']}
            style={styles.gradient}>
            <Text style={styles.gradientbutton_text}>
              {Config.strings.add_note}
            </Text>
          </LinearGradient>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity style={styles.gradient} onPress={handleEditButton}>
          <LinearGradient
            colors={['#24C6DC', '#514A9D']}
            style={styles.gradient}>
            <Text style={styles.gradientbutton_text}>
              {Config.strings.edit_note}
            </Text>
          </LinearGradient>
        </TouchableOpacity>
      )}

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
    backgroundColor: 'grey',
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

    justifyContent: 'center',
  },

  inputBox: {
    width: '100%',
    borderColor: 'purple',
    borderRadius: 8,
    borderWidth: 2,
    paddingLeft: 8,
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
    backgroundColor: '#fff',
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
  edit_text: {
    textAlign: 'center',
    fontSize: 20,
  },
  gradient: {
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 4,
  },
  gradientbutton_text: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 20,
    textAlign: 'center',
  },
});
