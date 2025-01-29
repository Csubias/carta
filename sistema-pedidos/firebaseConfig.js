import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyD9K7CtmFH0yQNWqTQMtNHvVAIp2-na8Pc",
  authDomain: "subi-20dd2.firebaseapp.com",
  projectId: "subi-20dd2",
  storageBucket: "subi-20dd2.firebasestorage.app",
  messagingSenderId: "1054825452909",
  appId: "1:1054825452909:web:b9446ff58284244e30b664",
  measurementId: "G-YG7KWFC48F",
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
