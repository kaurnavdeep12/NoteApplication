import React from 'react';
import store from '../redux/reducer';
import {Provider} from 'react-redux';

import AppContainer from './AppContainer';
export default function App() {
  return (
    <Provider store={store}>
      <AppContainer />
    </Provider>
  );
}
