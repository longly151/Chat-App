/**
 * @format
 */

import {
  AppRegistry,
  LogBox,
} from 'react-native';
import moment from 'moment';
import App from './src/app/app';
// import App from './App';
import {
  name as appName,
} from './app.json';
import 'react-native-gesture-handler';
import 'moment/locale/vi';

moment.locale('en');

LogBox.ignoreLogs([
  'Cannot update during an existing state transition',
  'Warning: Cannot update a component from inside the function body of a different component',
  "'Card.imageProps'",
  "'Card.image'",
  'Require cycle: node_modules/react-native-maps'
]);
AppRegistry.registerComponent(appName, () => App);
