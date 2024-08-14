// firebase.js
import { initializeApp } from "firebase/app";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { getFirestore, doc, getDoc } from "firebase/firestore";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAyc51lGJ-ja-tRQ9Gvmn7jpmOQQP7PD_Q",
  authDomain: "edutools-9268f.firebaseapp.com",
  projectId: "edutools-9268f",
  storageBucket: "edutools-9268f.appspot.com",
  messagingSenderId: "936076169165",
  appId: "1:936076169165:web:4b8c072ede0b64c907fe84",
  measurementId: "G-40TD37TSFS",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
const db = getFirestore(app);

export { auth, provider, signInWithPopup, db, getDoc, doc };
