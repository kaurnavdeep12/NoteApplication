import {AppActions} from '../ActionConstants/index';

export const addNote = (data: data): AppActions => ({
  type: 'ADD_NOTE',
  payload: {
    id: new Date().getTime().toString(),
    data: data,
  },
});

export const deleteNote = (id: id): AppActions => ({
  type: 'DELETE_NOTE',
  id,
});

export const editNote = (id: id): AppActions => ({
  type: 'EDIT_NOTE',
  id,
});
