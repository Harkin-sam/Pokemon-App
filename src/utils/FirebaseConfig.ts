import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { collection, getFirestore } from "firebase/firestore"


const firebaseConfig = {
  apiKey: "AIzaSyCkNy20iKu55m3ZzKa-TgRrASMYtf8SGxU",
  authDomain: "pokemon-dex-4e673.firebaseapp.com",
  projectId: "pokemon-dex-4e673",
  storageBucket: "pokemon-dex-4e673.appspot.com",
  messagingSenderId: "904931033591",
  appId: "1:904931033591:web:374fd520ebca13e070eef2",
  measurementId: "G-T45VYY6ZXW",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const firebaseAuth = getAuth(app);
export const firebaseDB = getFirestore(app)


// create DB colllections
export const userRef = collection(firebaseDB, "users");
export  const pokemonListRef = collection(firebaseDB, "pokemonList")