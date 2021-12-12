import firebase from "firebase/compat/app";
import "firebase/compat/storage";


const firebaseConfig = {
  apiKey: "AIzaSyDEqf0JE8Q5dJBWMv-9yMlGFAG8ZF8SXoo",
  authDomain: "socialproject-334817.firebaseapp.com",
  projectId: "socialproject-334817",
  storageBucket: "socialproject-334817.appspot.com",
  messagingSenderId: "186579919465",
  appId: "1:186579919465:web:829266470367bf7f1ff8f8",
  measurementId: "G-E3SX3F6158",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const storage = firebase.storage();

export { storage, firebase as default };