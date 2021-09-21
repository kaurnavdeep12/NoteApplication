import React, { useState } from 'react';
import { Button, StyleSheet, Text, TextInput, View } from 'react-native'
import { useDispatch, useSelector } from 'react-redux';
import { addNote, deleteNote } from '../redux/actions';

const NotesScreen = () => {
   const dispatch = useDispatch();
   const [Input, setInput] = useState<string>('');
   const list = useSelector(state => state.NoteReducers.list);
   console.log('list in app file++++++', list);

   const [error, showError] = useState<Boolean>(false);
   console.log('Input ++++', Input);

   return (
      <View style={styles.container}>
         <Text style={styles.title}>Note App</Text>
         <View style={styles.inputWrapper}>
            <TextInput
               placeholder="Enter your Notes Here..."
               value={Input}
               onChangeText={e => {
                  console.log('e++++++', e);
                  setInput(e);
                  showError(false);
               }}
               style={styles.inputBox}
            />
            <Button
               title="Add Note"
               onPress={() => dispatch(addNote(Input), setInput(' '))}
            />
         </View>
         {error && (
            <Text style={styles.error}>Error: Input field is empty...</Text>
         )}
         <Text style={styles.subtitle}>Your Notes :</Text>
         {list.length === 0 && <Text>No Notes available</Text>}
         {list.map(elem => (
            <View style={styles.listItem} key={elem.id}>
               <Text style={[styles.task]}>{elem.data}</Text>

               <Button
                  title="Delete"
                  color="crimson"
                  onPress={() => dispatch(deleteNote(elem.id))}
               />
            </View>
         ))}
      </View>
   );
}

export default NotesScreen


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
   },
   inputBox: {
      width: 250,
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