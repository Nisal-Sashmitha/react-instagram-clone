import {initializeApp} from "firebase/app"
import {getAuth,createUserWithEmailAndPassword} from "firebase/auth";
import {getStorage} from "firebase/storage";
/*import { getFirestore } from "firebase/firestore";*/

import {getFirestore,collection,getDocs,doc,addDoc,setDoc,updateDoc,onSnapshot} from 'firebase/firestore';
const firebaseConfig = {
    apiKey: "AIzaSyBMDVeHWP0lYv54mXIyhlott9SIW-0Bx-8",
    authDomain: "instagram-clone-react-25212.firebaseapp.com",
    projectId: "instagram-clone-react-25212",
    storageBucket: "instagram-clone-react-25212.appspot.com",
    messagingSenderId: "654485299782",
    appId: "1:654485299782:web:837108952bf57e47f9a047",
    measurementId: "G-26E69K19YH"
  };


const firebaseApp = initializeApp(firebaseConfig);

/*const db = getFirestore(firebaseApp);
const auth = getAuth(firebaseApp);
const storage = getStorage(firebaseApp);*/

export {getFirestore,collection,getDocs,doc,addDoc,setDoc,updateDoc,onSnapshot,getAuth,createUserWithEmailAndPassword,getStorage};

