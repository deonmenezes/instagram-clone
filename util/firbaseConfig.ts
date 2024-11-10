import { initializeApp } from 'firebase/app';
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';  
import { 
  doc, 
  getDoc, 
 
  setDoc, 
  serverTimestamp,
  writeBatch 
} from 'firebase/firestore';
const firebaseConfig = {
  apiKey: "AIzaSyDZUKkuILz8gEzXavC2qBXd78jDGx-662Q",
  authDomain: "instagram-11b2c.firebaseapp.com",
  projectId: "instagram-11b2c",
  storageBucket: "instagram-11b2c.firebasestorage.app",
  messagingSenderId: "913510553438",
  appId: "1:913510553438:web:c5d8e4d635eca5a4a861cf",
  measurementId: "G-T8DLRPD9T2"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
// const analytics = getAnalytics(app);

export default app;
