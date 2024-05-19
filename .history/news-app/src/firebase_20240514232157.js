// src/firebase.js
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';


const firebaseConfig = {
    apiKey: "AIzaSyB0DHA0Nsf5Aw_2iMpjaQzTvRn4dJxCOck",
    authDomain: "txtimg-36359.firebaseapp.com",
    projectId: "txtimg-36359",
    storageBucket: "txtimg-36359.appspot.com",
    messagingSenderId: "189050958678",
    appId: "1:189050958678:web:967180c5f9fd73a30b5cf7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore and Storage
const firestore = getFirestore(app);
const storage = getStorage(app);

export { firestore, storage };
