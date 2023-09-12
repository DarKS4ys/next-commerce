// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage"; // Import getStorage for Firebase Storage


const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_GOOGLE_API_KEY,
  authDomain: "next-commerce-61.firebaseapp.com",
  projectId: "next-commerce-61",
  storageBucket: "next-commerce-61.appspot.com",
  messagingSenderId: "289332011163",
  appId: "1:289332011163:web:c494a8d2fc92556377e63e",
  measurementId: "G-97KRNXBVEZ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);