// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDAeI4Ak4co557wQ186ZLSz4TeCXWDvNFc",
  authDomain: "pantry-cd3b9.firebaseapp.com",
  projectId: "pantry-cd3b9",
  storageBucket: "pantry-cd3b9.appspot.com",
  messagingSenderId: "998348164310",
  appId: "1:998348164310:web:e37b29994dde1104fc4d77"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export {app,firebaseConfig}