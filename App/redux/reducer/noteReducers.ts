import {NotesActionTypes} from '../ActionConstants/index';

const initialData = {
  list: [],
};
const noteReducers = (state = initialData, action: NotesActionTypes) => {
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
    default:
      return state;
  }
};

export default noteReducers;
