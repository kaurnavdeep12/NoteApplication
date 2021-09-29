import {AppRegistry, LogBox} from 'react-native';
import {name as appName} from './app.json';
// import App from './App';
import App from './App/navigation/index';
LogBox.ignoreLogs(['Warning: ...']); // Ignore log notification by message
LogBox.ignoreAllLogs(); //Ignore all log notifications

AppRegistry.registerComponent(appName, () => App);
