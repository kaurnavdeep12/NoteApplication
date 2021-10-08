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
  RefreshControlBase,
  Alert,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {AuthParamList} from '../Types/NavigationParams';
import {startAddNotes, getAddedNotes, deleteNotes} from '../redux/actions';
import {AppStates} from '../redux/reducer';
import {useDispatch, useSelector} from 'react-redux';

export interface Note {
  id: number;
  value: string;
}

const NotesScreen = () => {
  type NavigationProp = StackNavigationProp<AuthParamList, 'NotesScreen'>;
  const navigation = useNavigation<NavigationProp>();
  const note = useSelector((state: AppStates) => state.noteReducers);

  const [Input, setInput] = useState('');

  const dispatch = useDispatch();

  const onChangetxt = (text: string) => {
    setInput(text);
  };

  const onAddButtonPress = async () => {
    if (Input.length < 0) {
      Alert.alert('Please Enter Note');
    } else {
      await dispatch(startAddNotes(Input));

      dispatch(getAddedNotes());
    }
    setInput('');
  };

  const onDeletePress = (id: number) => {
    dispatch(deleteNotes(id));
  };

  const onClickItem = (item: any) => {
    navigation.navigate('NoteDetailScreen', {note: item.value});
  };

  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
        }}>
        <View style={styles.tasksWrapper}>
          <Text style={styles.sectionTitle}>Notes App</Text>
          <View style={styles.items}>
            {note.length > 0 &&
              note.map((item, index) => {
                return (
                  <TouchableOpacity onPress={() => onClickItem(item)}>
                    <View style={styles.item}>
                      <View style={styles.itemLeft}>
                        <View style={styles.square} />

                        <Text style={styles.itemText}>{item.value}</Text>
                      </View>
                      <Button
                        title="X"
                        color="crimson"
                        onPress={() => onDeletePress(item.id)}
                      />
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
          placeholder={'Write a Note'}
          onChangeText={onChangetxt}
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
    color: 'black',
  },
  items: {
    marginTop: 30,
    backgroundColor: 'white',
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
    backgroundColor: 'blue',
    opacity: 0.4,
    borderRadius: 5,
    marginRight: 15,
  },
  itemText: {
    maxWidth: '80%',
    fontWeight: 'bold',
  },
  circular: {
    width: 12,
    height: 12,
    borderColor: 'red',
    borderWidth: 2,
    borderRadius: 5,
  },
});
