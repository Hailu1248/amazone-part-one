import firebase from "firebase/compat/app";
//Below import is used to authentication
import {getAuth} from "firebase/auth"
import "firebase/compat/firestore"
import "firebase/compat/auth"


//Your web app's Firebase configurations
const firebaseConfig = {
  apiKey: "AIzaSyDylQ7jL1ZLF6-x3ekeVj_uZBOB5R7ZEZc",
  authDomain: "clone-2024-49fc9.firebaseapp.com",
  projectId: "clone-2024-49fc9",
  storageBucket: "clone-2024-49fc9.appspot.com",
  messagingSenderId: "492126935538",
  appId: "1:492126935538:web:c42f7f19c89dcf70e9f36b",
  measurementId: "G-5TYL48BGVT"
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const db = app.firestore()