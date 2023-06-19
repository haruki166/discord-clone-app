import { initializeApp } from "firebase/app";
import { GoogleAuthProvider, getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDDxC1siGegPEuDGeFfF0rNVbhYw5FWF84",
  authDomain: "discord-clone-udemy-c8a0c.firebaseapp.com",
  projectId: "discord-clone-udemy-c8a0c",
  storageBucket: "discord-clone-udemy-c8a0c.appspot.com",
  messagingSenderId: "681119249326",
  appId: "1:681119249326:web:ea2520c705bb557b258e3f",
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);
const auth = getAuth(app);

const provider = new GoogleAuthProvider();

export { db, auth, provider };
