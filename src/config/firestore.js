import { getFirestore } from "firebase/firestore";
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyCn_NR4rxq-RMVpBcZT_ZL7AWkX721MgEA",
  authDomain: "salon-edge.firebaseapp.com",
  projectId: "salon-edge",
  storageBucket: "salon-edge.firebasestorage.app",
  messagingSenderId: "979176740431",
  appId: "1:979176740431:web:b541427c57302f1c56fc3a"
};


const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);