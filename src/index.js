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
const db = getFirestore();
const colRef = collection(db, "movies")

getDocs(colRef).then(data => {
    data.docs.forEach(document => {
        console.log(document.data())
    })
})

const addMovForm = document.querySelector("#addMovForm");
addMovForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const movObject = {
        name: e.target.name.value,
        desc: e.target.desc.value
    }
    console.log(movObject);
    addDoc(colRef, movObject);
})