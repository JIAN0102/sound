import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore, collection } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: 'AIzaSyD2Xh-tLW319MZ1iQU1bhhLQidQrIn5bvU',
  authDomain: 'music-433a3.firebaseapp.com',
  projectId: 'music-433a3',
  storageBucket: 'music-433a3.appspot.com',
  messagingSenderId: '216809921607',
  appId: '1:216809921607:web:f8cf022f229d8dbc10e562',
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

const usersCollection = collection(db, 'users');
const songsCollection = collection(db, 'songs');
const commentsCollection = collection(db, 'comments');

export {
  auth,
  db,
  storage,
  usersCollection,
  songsCollection,
  commentsCollection,
};
