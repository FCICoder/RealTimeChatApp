import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// https://firebase.google.com/docs/web/setup#available-libraries

const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: "reactchat-e5d94.firebaseapp.com",
  projectId: "reactchat-e5d94",
  storageBucket: "reactchat-e5d94.appspot.com",
  messagingSenderId: "344347226752",
  appId: "1:344347226752:web:e27e3cdb3a8b5f9552ac65"
};

const app = initializeApp(firebaseConfig);
export const auth=getAuth()
export const db=getFirestore()
export const storage=getStorage()