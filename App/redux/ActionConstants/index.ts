// import {Note} from '../actions';

//Notes Action Types
export const ADD_NOTE = 'ADD_NOTE';
export const GET_NOTE = 'GET_NOTE';
export const DELETE_NOTE = 'DELETE_NOTE';

interface Note {
  id: number;
  value: string;
}
export interface AddNotesAction {
  type: typeof ADD_NOTE;
  // payload: {id: number; data: string};
  note: Note;
}

export interface GetNotesAction {
  type: typeof GET_NOTE;
  note: Note[];
}

export interface DeleteNotesAction {
  type: typeof DELETE_NOTE;
  id: number;
}

export type NotesActionTypes =
  | AddNotesAction
  | GetNotesAction
  | DeleteNotesAction;

export type AppActions = NotesActionTypes;
