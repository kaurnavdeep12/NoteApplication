import {AppRegistry} from 'react-native';
import {name as appName} from './app.json';
// import App from './App';
import App from './App/navigation/index';

AppRegistry.registerComponent(appName, () => App);
