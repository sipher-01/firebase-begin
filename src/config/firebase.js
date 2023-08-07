
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import {getAuth,GoogleAuthProvider } from 'firebase/auth'
import {getFirestore} from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyD1ch2eWcOPISakIxayZtwm1Y6zta8C9OI",
  authDomain: "fir-basics-b6a05.firebaseapp.com",
  projectId: "fir-basics-b6a05",
  storageBucket: "fir-basics-b6a05.appspot.com",
  messagingSenderId: "153383955500",
  appId: "1:153383955500:web:63d3310c19dc264cb67589",
  measurementId: "G-5VF3QCF7KM"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

export const auth = getAuth(app)
export const googleProvider = new GoogleAuthProvider();

export const db = getFirestore(app)