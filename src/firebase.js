import { initializeApp } from "firebase/app";
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyByE1IXm6hllVLviNZH7Gc1OHFHUCIpPyw",
  authDomain: "fyty-tournament.firebaseapp.com",
  projectId: "fyty-tournament",
  storageBucket: "fyty-tournament.appspot.com",
  messagingSenderId: "748439168691",
  appId: "1:748439168691:web:376d77093833a37221f2c6" 
}

const firebaseApp = initializeApp(firebaseConfig);
export const storage = getStorage(firebaseApp);

