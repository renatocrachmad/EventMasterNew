import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {
  getAuth,
  GoogleAuthProvider,
  FacebookAuthProvider,
  signInWithPopup,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword
} from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";  // <-- Importar storage

const firebaseConfig = {
  apiKey: "AIzaSyCsOjd9IuQ43-IWy2Ai2DkK0Wtu7APgXOw",
  authDomain: "serraservicosauto.firebaseapp.com",
  projectId: "serraservicosauto",
  storageBucket: "serraservicosauto.firebasestorage.app",
  messagingSenderId: "780398521505",
  appId: "1:780398521505:web:ac636ace97317d9e87d4e0",
  measurementId: "G-4C6XY9YV58"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);  // <-- Inicializar storage

const googleProvider = new GoogleAuthProvider();
const facebookProvider = new FacebookAuthProvider();

export {
  auth,
  db,
  storage,  // <-- Exportar storage
  googleProvider,
  facebookProvider,
  signInWithPopup,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  analytics
};
