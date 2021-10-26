import noteReducers from './noteReducers';
import thunk from 'redux-thunk';
import {combineReducers, createStore, applyMiddleware} from 'redux';

const rootReducer = combineReducers({
  noteReducers: noteReducers,
});
const store = createStore(rootReducer, applyMiddleware(thunk));

export type AppStates = ReturnType<typeof rootReducer>;
export default store;
