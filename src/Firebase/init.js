// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBALLGIW-1WGxFTjcGzZ17-TLwX1K9OB1w",
  authDomain: "week7tian.firebaseapp.com",
  projectId: "week7tian",
  storageBucket: "week7tian.appspot.com",
  messagingSenderId: "350510392929",
  appId: "1:350510392929:web:fbd7b611deb7bb49d0ac20"
};

initializeApp(firebaseConfig);
const db = getFirestore()
export default db