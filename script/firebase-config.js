// Import Firebase SDKs (v9+ modular)
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/11.0.0/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/11.0.0/firebase-firestore.js";

// Your Firebase configuration - REPLACE WITH YOUR OWN CONFIG
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDzI-hi8yLSnos2JcKgU8TRK17BNWAY8Fw",
  authDomain: "gym-management-70b1d.firebaseapp.com",
  projectId: "gym-management-70b1d",
  storageBucket: "gym-management-70b1d.firebasestorage.app",
  messagingSenderId: "257300380529",
  appId: "1:257300380529:web:46f28fa01a24d7c61054d0",
  measurementId: "G-KVKKCR965Q"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);