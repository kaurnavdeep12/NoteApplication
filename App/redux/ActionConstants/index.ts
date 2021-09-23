//Notes Action Types
export const ADD_NOTE = 'ADD_NOTE';
export const DELETE_NOTE = 'DELETE_NOTE';
export const EDIT_NOTE = 'EDIT_NOTE';

export interface AddNotesAction {
  type: typeof ADD_NOTE;
  payload: {id: any; data: string};
}

export interface DeleteNotesAction {
  type: typeof DELETE_NOTE;
  id: any;
}

export interface EditNotesAction {
  type: typeof EDIT_NOTE;
  id: any;
}

export type NotesActionTypes =
  | AddNotesAction
  | DeleteNotesAction
  | EditNotesAction;

export type AppActions = NotesActionTypes;
