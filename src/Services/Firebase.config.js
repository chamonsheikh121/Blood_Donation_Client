// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDBx8eD1g_U87-7xwvkztHs2kQCimQS8t4",
  authDomain: "blood-donation-aedcb.firebaseapp.com",
  projectId: "blood-donation-aedcb",
  storageBucket: "blood-donation-aedcb.appspot.com",
  messagingSenderId: "430259088040",
  appId: "1:430259088040:web:13115c6240e675f838f09d"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export default auth;
