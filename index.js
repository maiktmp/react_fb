/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import Login from './login/Login';
import Create from './crud/Create';

AppRegistry.registerComponent(appName, () => Login);
