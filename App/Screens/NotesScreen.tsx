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
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {AuthParamList} from '../Types/NavigationParams';
import {startAddNotes} from '../redux/actions';
import {AppStates} from '../redux/reducer';
import {useDispatch, useSelector} from 'react-redux';

const NotesScreen = () => {
  const note = useSelector((state: AppStates) => state.noteReducers);
  console.log('note in NotesScreen++++', note);
  console.log('note in NotesScreen++++', note);
  const [Input, setInput] = useState('');
  const dispatch = useDispatch();

  const onChangetxt = (text: string) => {
    setInput(text);
  };

  const onAddButtonPress = async () => {
    await dispatch(startAddNotes(Input));
  };

  const renderItems = ({item}: any) => {
    return (
      <TouchableOpacity>
        <View style={styles.item}>
          <View style={styles.itemLeft}>
            <View style={styles.square} />
            <Text style={styles.itemText}>{item.value}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };
  return (
    <View style={styles.container}>
      <ScrollView
        // eslint-disable-next-line react-native/no-inline-styles
        contentContainerStyle={{
          flexGrow: 1,
        }}>
        <View style={styles.tasksWrapper}>
          <Text style={styles.sectionTitle}>Notes App</Text>
          <View style={styles.items}>
            {note.length > 0 &&
              note.map(item => {
                console.log('item in map===>', item);
                return (
                  <TouchableOpacity>
                    <View style={styles.item}>
                      <View style={styles.itemLeft}>
                        <View style={styles.square} />
                        <Text style={styles.itemText}>{item.id}</Text>
                      </View>
                    </View>
                  </TouchableOpacity>
                );
              })}
            {/* <FlatList
              data={note}
              showsHorizontalScrollIndicator={false}
              keyExtractor={item => item.id.toString()}
              renderItem={({item}) => {
                console.log('item in flatlist++++++', item);
                return (
                  <TouchableOpacity>
                    <View style={styles.item}>
                      <View style={styles.itemLeft}>
                        <View style={styles.square} />
                        <Text style={styles.itemText}>{item.value}</Text>
                      </View>
                    </View>
                  </TouchableOpacity>
                );
              }}
            /> */}
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
    backgroundColor: 'grey',
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
    backgroundColor: 'blue',
  },
  circular: {
    width: 12,
    height: 12,
    borderColor: '#55BCF6',
    borderWidth: 2,
    borderRadius: 5,
  },
});
