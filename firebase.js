// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";
import QRCode from "react-native-qrcode-svg";

import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import {
  getAuth,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { useEffect, useState } from "react";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCihCWULzyR36JcQVRaSPgY4ICHdrJ1_gc",
  authDomain: "finala-fii-code.firebaseapp.com",
  projectId: "finala-fii-code",
  storageBucket: "finala-fii-code.appspot.com",
  messagingSenderId: "941386633546",
  appId: "1:941386633546:web:c620396d7bfc8c99f071b3",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
const auth = getAuth();

export const storage = getStorage(app);

export async function signup(email, password) {
  return createUserWithEmailAndPassword(auth, email, password);
}
export function login(email, password) {
  return signInWithEmailAndPassword(auth, email, password);
}
export function logout() {
  return signOut(auth);
}

export function useAuth() {
  const [currentUser, setCurrentUser] = useState();

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
    });
    return unsub;
  }, []);
  return currentUser;
}
//Storage
export async function upload(file, currentUser, setLoading) {
  const fileRef = ref(storage, currentUser.uid + ".png");

  setLoading(true);
  const snapshot = await uploadBytes(fileRef, file);

  const photoURL = await getDownloadURL(fileRef);

  updateProfile(currentUser, { photoURL });
  setLoading(false);
  alert("Upload complet - Refresh pagina pentru schimbari");
}
