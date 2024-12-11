import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBQEdKdN0JcWEEiOtuyzai18kFnjZX0sIc",
  authDomain: "photo-folio-8798c.firebaseapp.com",
  projectId: "photo-folio-8798c",
  storageBucket: "photo-folio-8798c.firebasestorage.app",
  messagingSenderId: "159290780679",
  appId: "1:159290780679:web:a8b08d8e0f941984534ea2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export {db};