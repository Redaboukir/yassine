import { initializeApp } from "firebase/app";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail, // Importe sendPasswordResetEmail
} from "firebase/auth";

// Configuration Firebase
const firebaseConfig = {
  apiKey: "AIzaSyAsMUDuLqtGd5rN3_MT-ZPw7_bFwv9TyNs",
  authDomain: "yassine-f635d.firebaseapp.com",
  projectId: "yassine-f635d",
  storageBucket: "yassine-f635d.firebasestorage.app",
  messagingSenderId: "547676971822",
  appId: "1:547676971822:web:a361858902b86fd455d0bf",
  measurementId: "G-3HHF2FK0E2",
};

// Initialiser Firebase
const app = initializeApp(firebaseConfig);

// Authentification Firebase
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

// Fonction d'authentification avec Google
export const signInWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    const user = result.user;
    console.log(user);
  } catch (error) {
    console.error(error);
  }
};

// Authentification par email et mot de passe
export const signUpWithEmailPassword = (email, password) => {
  return createUserWithEmailAndPassword(auth, email, password);
};

export const signInWithEmailPassword = (email, password) => {
  return signInWithEmailAndPassword(auth, email, password);
};

// Fonction pour envoyer un email de réinitialisation de mot de passe
export const sendPasswordReset = async (email) => {
  try {
    await sendPasswordResetEmail(auth, email); // Utilise sendPasswordResetEmail
    alert("Un email de réinitialisation de mot de passe a été envoyé !");
  } catch (error) {
    console.error("Erreur lors de l'envoi de l'email de réinitialisation:", error);
    throw error;
  }
};

// Déconnexion
export const signOutUser = () => {
  return signOut(auth);
};