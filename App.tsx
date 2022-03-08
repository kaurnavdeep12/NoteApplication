import React from 'react';
import {SafeAreaView, StatusBar} from 'react-native';
import {Provider as ReduxProvider} from 'react-redux';
import DetailScreen from './src/screens/DetailScreen';
import UserList from './src/screens/UserList';
import store from './src/store';

function App() {
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView>
        <ReduxProvider store={store}>
          {/* <DetailScreen /> */}
          <UserList />
        </ReduxProvider>
      </SafeAreaView>
    </>
  );
}

export default App;
