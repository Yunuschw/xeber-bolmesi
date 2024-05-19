// src/firebase.js
import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/storage';

const firebaseConfig = {
    apiKey: "AIzaSyB0DHA0Nsf5Aw_2iMpjaQzTvRn4dJxCOck",
    authDomain: "txtimg-36359.firebaseapp.com",
    projectId: "txtimg-36359",
    storageBucket: "txtimg-36359.appspot.com",
    messagingSenderId: "189050958678",
    appId: "1:189050958678:web:967180c5f9fd73a30b5cf7"
};

firebase.initializeApp(firebaseConfig);

const firestore = firebase.firestore();
const storage = firebase.storage();

export { firestore, storage };
