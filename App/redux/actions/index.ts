import {AppActions} from '../ActionConstants/index';
import firestore, {firebase} from '@react-native-firebase/firestore';
import {Dispatch} from 'react';
import {AppState} from 'react-native';

export interface Note {
  id: number;
  value: string;
}

export const addNote = (note: Note): AppActions => ({
  type: 'ADD_NOTE',
  note,
});

export const getNote = (note: Note[]): AppActions => ({
  type: 'GET_NOTE',
  note,
});

export const deleteNote = (note: Note): AppActions => ({
  type: 'DELETE_NOTE',
  note,
});

export const editNote = (id: number): AppActions => ({
  type: 'EDIT_NOTE',
  id,
});

// add Notes to firestore
export const startAddNotes = (value: string) => {
  return async (dispatch: Dispatch<AppActions>, _getState: () => AppState) => {
    firebase.auth().currentUser;
    const note = {
      id: new Date().getTime(),
      value,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
    };
    firebase.firestore().collection('newNotes').add(note);

    dispatch(addNote(note));
    return {code: 200};
  };
};

// get notes from firestore
export const getAddedNotes = () => {
  return async (dispatch: Dispatch<AppActions>, _getState: () => AppState) => {
    const db = firebase.firestore();
    const notes: Note[] = [];
    firebase.auth().currentUser;
    db.collection('newNotes')
      .orderBy('id', 'desc')
      .get()
      .then(snapshot => {
        snapshot.docs.forEach(doc => {
          const newArray = notes.push({
            id: doc.data().id,
            value: doc.data().value,
          });
        });
        dispatch(getNote(notes));
      });
  };
};

export const deleteNotes = (id: number) => {
  return async (_dispatch: Dispatch<AppActions>, _getState: () => AppState) => {
    firebase.auth().currentUser;

    firebase.firestore().collection('notes').doc(id).delete();

    _dispatch(deleteNote(id));
  };
};
