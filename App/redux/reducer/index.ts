import noteReducers from './noteReducers';

import {combineReducers, createStore} from 'redux';
const rootReducer = combineReducers({
  noteReducers,
});

const store = createStore(rootReducer);
export default store;
