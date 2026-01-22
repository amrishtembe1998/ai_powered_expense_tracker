// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";
import { FIREBASE_API_KEY } from "../constants";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: FIREBASE_API_KEY,
  authDomain: "gpt-project-be1c5.firebaseapp.com",
  projectId: "gpt-project-be1c5",
  storageBucket: "gpt-project-be1c5.firebasestorage.app",
  messagingSenderId: "806159363582",
  appId: "1:806159363582:web:d6d03982ae140103ab64af",
  measurementId: "G-F1VW92K2JJ",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth(app);
