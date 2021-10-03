import thunk from 'redux-thunk';

import {combineReducers, createStore, applyMiddleware} from 'redux';
import noteReducers from './noteReducers';
const rootReducer = combineReducers({
  noteReducers: noteReducers,
});

const store = createStore(rootReducer, applyMiddleware(thunk));
console.log('store =====>', store);

export type AppStates = ReturnType<typeof rootReducer>;
export default store;
