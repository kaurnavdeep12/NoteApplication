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
import {addNote} from '../redux/actions';

const NoteDetailScreen = ({}) => {
  return (
    <View style={{backgroundColor: 'grey', flex: 1}}>
      <View style={styles.container}>
        <Text style={styles.txt}>NoteDetail</Text>
      </View>
    </View>
  );
};

export default NoteDetailScreen;
const styles = StyleSheet.create({
  container: {
    padding: 35,
    alignItems: 'center',
    backgroundColor: '#fff',
    margin: 20,
    borderRadius: 20,
  },

  txt: {
    fontSize: 40,
  },
});
