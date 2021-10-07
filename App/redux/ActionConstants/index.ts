//Notes Action Types
export const ADD_NOTE = 'ADD_NOTE';
export const DELETE_NOTE = 'DELETE_NOTE';
export const EDIT_NOTE = 'EDIT_NOTE';

export interface AddNotesAction {
  type: typeof ADD_NOTE;
  payload: {id: number; data: string};
}

export interface DeleteNotesAction {
  type: typeof DELETE_NOTE;
  id: number;
}

export type NotesActionTypes = AddNotesAction | DeleteNotesAction;

export type AppActions = NotesActionTypes;
