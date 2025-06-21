// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB3J-R9qr1HxRM82Tcx0jyOcXKd1oEQJNw",
  authDomain: "library-management-a7869.firebaseapp.com",
  projectId: "library-management-a7869",
  storageBucket: "library-management-a7869.firebasestorage.app",
  messagingSenderId: "561920003728",
  appId: "1:561920003728:web:a970b88011c1760a471215"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
export default auth;
