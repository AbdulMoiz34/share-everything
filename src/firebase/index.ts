import { getDatabase, ref, set, onValue, remove, update } from "firebase/database";
import { createUserWithEmailAndPassword, getAuth, onAuthStateChanged, GoogleAuthProvider, signInWithPopup, signInWithEmailAndPassword } from "firebase/auth";
import { initializeApp } from "firebase/app";

const firebaseConfig = {
    apiKey: "AIzaSyDXwE3uKzkSoRDuK0cDOHuy-uHNsgXqkQU",
    authDomain: "fast-share-9d6f9.firebaseapp.com",
    projectId: "fast-share-9d6f9",
    storageBucket: "fast-share-9d6f9.firebasestorage.app",
    messagingSenderId: "608573485089",
    appId: "1:608573485089:web:9ef219798334766eeab360",
    measurementId: "G-0R2VZCPHT9",
    databaseURL: "https://fast-share-9d6f9-default-rtdb.asia-southeast1.firebasedatabase.app/"
}
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

export {
    db,
    ref,
    set,
    onValue,
    remove,
    update,
    auth,
    createUserWithEmailAndPassword,
    onAuthStateChanged,
    googleProvider,
    signInWithPopup,
    signInWithEmailAndPassword
};