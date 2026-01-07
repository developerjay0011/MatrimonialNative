/**
 * @format
 */

import App from './App';
import { AppRegistry } from 'react-native';
import { name as appName } from './app.json';
import { enGB, registerTranslation } from 'react-native-paper-dates';
registerTranslation('en', enGB)

AppRegistry.registerComponent(appName, () => App);
