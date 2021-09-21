import React, { useState } from 'react';
import { Button, StyleSheet, Text, TextInput, View, FlatList } from 'react-native'
import { useDispatch, useSelector } from 'react-redux';
import { addNote, deleteNote } from '../redux/actions';
import Config from "../utils/Config"

const NotesScreen = () => {
   const dispatch = useDispatch();
   const list = useSelector(state => state.NoteReducers.list);

   // States
   const [Input, setInput] = useState<string>('');
   const [error, showError] = useState<Boolean>(false);

   // Set Input field
   const onChangeNotes = (text: string) => {
      setInput(text)
      showError(false)
   }

   // On the press of button add notes
   const onButtonPress = () => {
      dispatch(addNote(Input)),
         setInput("")
   }

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
            <Button
               title="Add Note"
               onPress={onButtonPress}
            />
         </View>
         {error && (
            <Text style={styles.error}>{Config.strings.error_text}</Text>
         )}
         <Text style={styles.subtitle}>{Config.strings.sub_title}</Text>
         {list.length === 0 && <Text>{Config.strings.helping_text}</Text>}
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