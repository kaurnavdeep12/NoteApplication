import {firebase} from '@react-native-firebase/firestore';
import {Dispatch} from 'react';
import {AppState} from 'react-native';
import {AppActions} from '../ActionConstants/index';

// const user = firebase.auth().currentUser;
// console.log('uid in action screen==', user?.uid);

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

export const deleteNote = (id: number): AppActions => ({
  type: 'DELETE_NOTE',
  id,
});

// add Notes to Firebase
export const startAddNotes = (value: string) => {
  return async (dispatch: Dispatch<AppActions>, _getState: () => AppState) => {
    const user = firebase.auth().currentUser;

    const note = {
      id: new Date().getTime(),
      value,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      userId: user?.uid,
    };
    // console.log('userId in action====', user?.uid);
    firebase.firestore().collection('AddNote').add(note);
    dispatch(addNote(note));
    return {code: 200};
  };
};

// get notes from firestore

export const getNotesFirestore = () => {
  return async (dispatch: Dispatch<AppActions>, _getState: () => AppState) => {
    const db = firebase.firestore();
    const notes: Note[] = [];
    const user = firebase.auth().currentUser;
    db.collection('AddNote')
      .orderBy('userId', 'desc')
      .get()
      .then(snapshot => {
        snapshot.docs.forEach(doc => {
          console.log('doc.userId ====', doc.data());
          console.log('uid in function===', user?.uid);
          if (doc.data().userId === user?.uid) {
            notes.push({
              id: doc.data().id,
              value: doc.data().value,
            });
          }
        });
        dispatch(getNote(notes));
      });
  };
};

// delete Notes from Firebase
export const deleteNotes = (id: number) => {
  return (dispatch: Dispatch<AppActions>, _getState: () => AppState) => {
    const db = firebase.firestore();
    db.collection('AddNote')
      .where('id', '==', id)
      .get()
      .then(querySnapshot => {
        const docId = querySnapshot.docs.map(doc => doc.id);
        db.collection('AddNote').doc(docId.toString()).delete();
        dispatch(deleteNote(id));
      });
  };
};
