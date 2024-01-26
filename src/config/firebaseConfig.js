// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Allows you to connect to the database
import {getFirestore} from 'firebase/firestore'

// Allos you to connect with the storage
import {getStorage} from 'firebase/storage'

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCqrYVtIiiodRNnqGYfzpHxAzvPMOAwi2s",
  authDomain: "pixify-enhanced.firebaseapp.com",
  projectId: "pixify-enhanced",
  storageBucket: "pixify-enhanced.appspot.com",
  messagingSenderId: "675972801720",
  appId: "1:675972801720:web:03ec7bc213ded299ac004d"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Set up database and export it
export const db = getFirestore(app)

// Set up storage and active it
export const storage = getStorage(app);