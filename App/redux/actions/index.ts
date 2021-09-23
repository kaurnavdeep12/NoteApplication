import {AppActions} from '../ActionConstants/index';

export const addNote = (data: string): AppActions => ({
  type: 'ADD_NOTE',
  payload: {
    id: new Date().getTime().toString(),
    data: data,
  },
});

export const deleteNote = (id: number): AppActions => ({
  type: 'DELETE_NOTE',
  id,
});

export const editNote = (id: number): AppActions => ({
  type: 'EDIT_NOTE',
  id,
});
