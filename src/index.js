// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { doc, addDoc, collection, deleteDoc, getDocs, getFirestore, serverTimestamp, query, where } from "firebase/firestore";
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
const colRef = collection(db, "movies");

const movCardContainer = document.querySelector("#movCardContainer");

async function fetchAndRenderMovies(queryValue = "") {
    try {
        let queryRef = colRef;
        if (queryValue) {
            queryRef = query(colRef, where("category", "==", queryValue));
        }

        // Fetch from Firebase
        const querySnapshot = await getDocs(queryRef);

        let cards = '';
        // Iterate each document
        querySnapshot.forEach((doc) => {
            // console.log(doc.data());
            const movieData = doc.data();
            // Generate card html adn concat it to cards variable
            cards += renderMovie(movieData, doc.id);
        });

        // Override card container innerHTML
        movCardContainer.innerHTML = cards;
    } catch (error) {
        console.error("Error fetching and rendering movies:", error);
    }
}

// Call function
fetchAndRenderMovies();

const addMov = document.querySelector("#addMov");
addMov.addEventListener("submit", (e) => {
    e.preventDefault();
    const newMov = {
        name: e.target.movName.value,
        category: e.target.movCategory.value,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
    }
    console.log(newMov);
    addDoc(colRef, newMov);
    fetchAndRenderMovies();
})

const deleteMov = document.querySelector("#deleteMov");
deleteMov.addEventListener("submit", (e) => {
    e.preventDefault();
    const docRef = doc(db, "movies", e.target.movId.value);
    deleteDoc(docRef).then((() => {
        console.log("movie deleted successfully")
        fetchAndRenderMovies();
    }))
})

const queryMov = document.querySelector("#queryMov");
queryMov.addEventListener("submit", (e) => {
    e.preventDefault();
    fetchAndRenderMovies(e.target.movQuery.value)
})

const clearQuery = document.querySelector("#clearQuery");
clearQuery.addEventListener("click", (e) => {
    e.preventDefault();
    queryMov.reset();
    fetchAndRenderMovies();
})

// onSnapshot(colRef, (data) => {
//     data.docs.forEach(document => {
//         console.log(document.data())
//     })
// })

function renderMovie(movieData, id) {
    return `<div class="card border border-black mb-4">
                <div class="card-body">
                    <h5 class="card-title">${movieData.name}</h5>
                </div>
                <ul class="list-group list-group-flush">
                    <li class="list-group-item"><b>Id: </b>${id}</li>
                    <li class="list-group-item"><b>Category: </b>${movieData.category}</li >
                    <li class="list-group-item"><b>Created at: </b>${movieData.createdAt.toDate()}</li>
                    <li class="list-group-item"><b>Updated at: </b>${movieData.updatedAt.toDate()}</li>
                </ul >
            </div > `
}