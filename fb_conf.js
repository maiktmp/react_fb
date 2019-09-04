import * as firebase from 'firebase';

const _useFb = () => {
  if (!firebase.apps.length) {
    const firebaseConfig = {
      apiKey: 'AIzaSyBACjCDT5Yk8PbwMQI3zvMwOT2BoC8Ax6U',
      authDomain: 'react-firebase-50308.firebaseapp.com',
      databaseURL: 'https://react-firebase-50308.firebaseio.com',
      projectId: 'react-firebase-50308',
      storageBucket: 'react-firebase-50308.appspot.com',
      messagingSenderId: '602001500230',
      appId: '1:602001500230:web:632102877f694fbf',
    };
    firebase.initializeApp(firebaseConfig);
  }
};

export default _useFb;