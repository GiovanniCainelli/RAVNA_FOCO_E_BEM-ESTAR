import firebase from 'firebase';
import 'firebase/storage';
import 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyD7jORlXqlDIA0e0R6A8mKsPPWJ8xoRS0g',
  authDomain: 'ravnacerto2.firebaseapp.com',
  projectId: 'ravnacerto2',
  storageBucket: 'ravnacerto2.appspot.com',
  messagingSenderId: '335056783002',
  appId: '1:335056783002:web:6e8be2546784e3b26ec123',
};
if (!firebase.apps.length){
  firebase.initializeApp(firebaseConfig);
} else {
  firebase.app();
}
export default firebase;
