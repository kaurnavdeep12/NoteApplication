import NoteReducers from './noteReducers';

import {combineReducers, createStore} from 'redux';
const rootReducer = combineReducers({
  NoteReducers,
});

const store = createStore(rootReducer);
export default store;
