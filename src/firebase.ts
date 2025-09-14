// lib/firebase.ts
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBj0EOL1oITtcblZWQaFTrXbb_KvB1psWo",
  authDomain: "vifa-project.firebaseapp.com",
  projectId: "vifa-project",
  storageBucket: "vifa-project.firebasestorage.app",
  messagingSenderId: "563837540723",
  appId: "1:563837540723:web:06b809f19f1ffa38a60d06",
  measurementId: "G-RSPBVV8K85"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
export const db = getFirestore(app);

// Initialize Analytics (only in browser)
export const analytics = typeof window !== 'undefined' ? getAnalytics(app) : null;

export default app;