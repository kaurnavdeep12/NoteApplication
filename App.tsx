import React from 'react';
import { Provider } from 'react-redux';
import NotesScreen from './src/components/NotesScreen';
import store from './src/redux/reducer';

export default function App() {
  return (
    <Provider store={store}>
      <NotesScreen />
    </Provider>
  )
}

