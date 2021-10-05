//Notes Action Types
export const ADD_NOTE = 'ADD_NOTE';
export const GET_NOTE = 'GET_NOTE';
export const DELETE_NOTE = 'DELETE_NOTE';
export const EDIT_NOTE = 'EDIT_NOTE';

interface Note {
  id: number;
  value: string;
}

export interface AddNotesAction {
  type: typeof ADD_NOTE;
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

export interface EditNotesAction {
  type: typeof EDIT_NOTE;
  id: any;
}

export type NotesActionTypes =
  | AddNotesAction
  | GetNotesAction
  | DeleteNotesAction
  | EditNotesAction;

export type AppActions = NotesActionTypes;
