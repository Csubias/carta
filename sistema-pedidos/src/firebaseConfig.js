import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "TU_API_KEY_REAL",
  authDomain: "TU_AUTH_DOMAIN_REAL",
  projectId: "TU_PROJECT_ID_REAL",
  storageBucket: "TU_STORAGE_BUCKET_REAL",
  messagingSenderId: "TU_MESSAGING_SENDER_ID_REAL",
  appId: "TU_APP_ID_REAL",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
