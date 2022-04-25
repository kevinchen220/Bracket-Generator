// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAb-YViQehXIPSl1aAMx9kjeCdz3CdR5iA",
  authDomain: "bracketgenerator-220.firebaseapp.com",
  projectId: "bracketgenerator-220",
  storageBucket: "bracketgenerator-220.appspot.com",
  messagingSenderId: "785432993769",
  appId: "1:785432993769:web:683845fff0309374367578",
  measurementId: "G-EQ43471J6S"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export default app;