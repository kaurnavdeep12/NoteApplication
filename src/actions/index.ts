export const addNote = (data: string) => {
  return {
    type: 'ADD_NOTE',
    payload: {
      id: new Date().getTime().toString(),
      data: data,
    },
  };
};

export const deleteNote = (id: any) => {
  return {
    type: 'DELETE_NOTE',
    id,
  };
};
