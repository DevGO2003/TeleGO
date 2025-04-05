import { AppRegistry } from 'react-native';
import App from './App';  // Import App.jsx
import { name as appName } from './app.json';  // Tên ứng dụng từ app.json
console.log(appName);
AppRegistry.registerComponent(appName, () => App);
