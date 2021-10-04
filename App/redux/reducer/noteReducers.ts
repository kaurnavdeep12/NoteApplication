import {NotesActionTypes} from '../ActionConstants/index';

interface Note {
  id: number;
  value: string;
}
const initialData: Note[] = [];
const noteReducers = (state = initialData, action: NotesActionTypes) => {
  switch (action.type) {
    case 'ADD_NOTE':
      return {...state, ...action.note};

    case 'GET_NOTE':
      return [...action.note];

    case 'DELETE_NOTE':
      return {...action.note};

    default:
      return state;
  }
};

export default noteReducers;
