// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// Optionally import the services that you want to use
import { getAuth, GoogleAuthProvider } from "firebase/auth";

// import {...} from "firebase/firestore";
// import {...} from "firebase/functions";
// import {...} from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBVCYrn_7EkXhIqK636auymMrDYdccFKnI",
  authDomain: "recipe-7f801.firebaseapp.com",
  projectId: "recipe-7f801",
  storageBucket: "recipe-7f801.appspot.com",
  messagingSenderId: "8577072164",
  appId: "1:8577072164:web:867a9c005358785b9bacb1",
  databaseURL: 'https://project-id.firebaseio.com',
  measurementId: 'G-measurement-id',
};

// Initialize Firebase
const firebase = initializeApp(firebaseConfig);
const auth = getAuth(firebase);

export const googleProvider = new GoogleAuthProvider();
export default auth;
