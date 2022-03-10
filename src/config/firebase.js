// Import the functions you need from the SDKs you need
import firebase from "firebase/compat/app"
import { initializeApp } from "firebase/app";
import { getAuth} from "firebase/auth"

import "firebase/firestore"
import { getFirestore } from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyAkE19PDdn9-dNxaEjmESH81NbNF0fmpnw",
  authDomain: "tododata-1da94.firebaseapp.com",
  projectId: "tododata-1da94",
  storageBucket: "tododata-1da94.appspot.com",
  messagingSenderId: "733943663879",
  appId: "1:733943663879:web:1c49af397a16eeac56c9a2"
};


const app = initializeApp(firebaseConfig);
const db = getFirestore()
const auth = getAuth()
export  { firebase  ,db ,auth }
