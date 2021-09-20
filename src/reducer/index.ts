import NoteReducers from './noteReducers';
import {combineReducers} from 'redux';
const rootReducer = combineReducers({
  NoteReducers,
});

export default rootReducer;
