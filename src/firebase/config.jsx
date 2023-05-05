import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBLOx3JbSDWoWFRFcza8OkoOt32BFTcxs4",
  authDomain: "miniblog-ac301.firebaseapp.com",
  projectId: "miniblog-ac301",
  storageBucket: "miniblog-ac301.appspot.com",
  messagingSenderId: "361531300927",
  appId: "1:361531300927:web:fcb5f85530320af6f6ac8a",
  measurementId: "G-9FWBRN9FD1",
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);

export { db };
