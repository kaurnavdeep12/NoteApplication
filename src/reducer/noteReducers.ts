export interface NoteAdd {
  list: String[];
}

const initialData = {
  list: [],
};
const NoteReducers = (
  state = initialData,
  action: {type: string; payload: {id: any; data: string}},
) => {
  switch (action.type) {
    case 'ADD_NOTE':
      const {id, data} = action.payload;
      console.log('data in reducers', data);
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

      return {
        ...state,
        list: newList,
      };
    default:
      return state;
  }
};

export default NoteReducers;
