import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDkeV7nfGlNO1zFnU5tskOGYWhG3azIk7U",
  authDomain: "ai-journal-5d3eb.firebaseapp.com",
  projectId: "ai-journal-5d3eb",
  storageBucket: "ai-journal-5d3eb.firebasestorage.app",
  messagingSenderId: "1048614154642",
  appId: "1:1048614154642:web:c796c6b65197566fd8d14b"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
