import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import Vue from 'vue';

const firebaseConfig = {
  apiKey: 'AIzaSyAeI8Xdu1AzTTOCop46zt-uCUXbjEeuE0Y',
  authDomain: 'uber-pos.firebaseapp.com',
  databaseURL: 'https://uber-pos.firebaseio.com',
  projectId: 'uber-pos',
  storageBucket: 'uber-pos.appspot.com',
  messagingSenderId: '741117572583',
  appId: '1:741117572583:web:25515ddc17fbd30b',
};

const app = firebase.initializeApp(firebaseConfig);
export default app;
Vue.prototype.$firebase = app;
Vue.prototype.$firestore = app.firestore();
