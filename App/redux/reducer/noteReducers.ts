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
      const newlist = state.filter(({id}) => id !== action.id);
      return {...state, ...newlist};

    // eslint-disable-next-line no-fallthrough
    default:
      return state;
  }
};

export default noteReducers;
