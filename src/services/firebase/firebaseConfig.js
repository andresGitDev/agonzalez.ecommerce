import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyB_XigDeYlAzLXrKJUpdBuAexjYf5mJNes",
  authDomain: "dbecommerce-9d8f6.firebaseapp.com",
  projectId: "dbecommerce-9d8f6",
  storageBucket: "dbecommerce-9d8f6.appspot.com",
  messagingSenderId: "482936973707",
  appId: "1:482936973707:web:9be728445ba6d6852f278e"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app)