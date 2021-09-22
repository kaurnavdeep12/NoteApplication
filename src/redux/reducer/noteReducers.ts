import {NotesActionTypes} from '../ActionConstants/index';

// export interface NoteAdd {
//   list: String[];
// }

const initialData = {
  list: [],
};
const NoteReducers = (state = initialData, action: NotesActionTypes) => {
  console.log('action in noteReducers', action);
  switch (action.type) {
    case 'ADD_NOTE':
      const {id, data} = action.payload;

      return {
        ...state,
        list: [
          ...state.list,
          {
            id: id,
            data: data,
          },
        ],
      };
    case 'DELETE_NOTE':
      const newList = state.list.filter(elem => elem.id != action.id);
      console.log('newlist in delete node', newList);
      console.log('state in delete node', state.list);

      return {
        ...state,
        list: newList,
      };

    case 'EDIT_NOTE':
      const newEditItem = state.list.find(elem => elem.id === action.id);

      console.log('newEditItem ++++', newEditItem);

      return {
        ...state,
        list: newEditItem,
      };
    default:
      return state;
  }
};

export default NoteReducers;
