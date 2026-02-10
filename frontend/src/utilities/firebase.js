// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { FIREBASE_API_KEY } from "../constants";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: FIREBASE_API_KEY,
  authDomain: "ai-powered-expense-track-91958.firebaseapp.com",
  projectId: "ai-powered-expense-track-91958",
  storageBucket: "ai-powered-expense-track-91958.firebasestorage.app",
  messagingSenderId: "363643321904",
  appId: "1:363643321904:web:0106521c9596c1ace4b7f5",
  measurementId: "G-1WL5W3Z60E"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
