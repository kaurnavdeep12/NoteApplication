import {NotesActionTypes} from '../ActionConstants/index';

const initialData = {
  list: [],
};
const NoteReducers = (state = initialData, action: NotesActionTypes) => {
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

      return {
        ...state,
        list: newList,
      };

    case 'EDIT_NOTE':
      const newEditItem = state.list.find(elem => elem.id === action.id);

      return {
        ...state,
        list: newEditItem,
      };
    default:
      return state;
  }
};

export default NoteReducers;
