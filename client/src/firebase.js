// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-ecommerce-38733.firebaseapp.com",
  projectId: "mern-ecommerce-38733",
  storageBucket: "mern-ecommerce-38733.appspot.com",
  messagingSenderId: "125045446324",
  appId: "1:125045446324:web:b131c8e892aaf06bf329e1",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export default app;
