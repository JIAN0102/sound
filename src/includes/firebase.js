import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore, collection } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyBdwB8YhoZOJQBbBT6ZlCMJv92Bp0XBLMk',
  authDomain: 'sound-1b087.firebaseapp.com',
  projectId: 'sound-1b087',
  storageBucket: 'sound-1b087.appspot.com',
  messagingSenderId: '289619239789',
  appId: '1:289619239789:web:ae28ba476d49c8a4457064',
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const usersCollection = collection(db, 'users');

export { auth, db, usersCollection };
