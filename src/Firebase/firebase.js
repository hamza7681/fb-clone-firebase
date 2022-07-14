import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAyN6KLq5C6f41sbTiQoy3PduBT6u_8W4I",
  authDomain: "fb-clone-90f45.firebaseapp.com",
  projectId: "fb-clone-90f45",
  storageBucket: "fb-clone-90f45.appspot.com",
  messagingSenderId: "406913433388",
  appId: "1:406913433388:web:c29e1faf4b2e69b049b689",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export { app, auth, db, storage };
