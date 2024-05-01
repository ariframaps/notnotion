// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { addDoc, collection, getDocs, getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBOSxPXq9m_Xzrds2ikKroU4K_yMLI5qXE",
    authDomain: "notnotion-c3173.firebaseapp.com",
    projectId: "notnotion-c3173",
    storageBucket: "notnotion-c3173.appspot.com",
    messagingSenderId: "410108423561",
    appId: "1:410108423561:web:1cc14bee1c3e0123bbc558",
    measurementId: "G-YHQTEM09KN"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
