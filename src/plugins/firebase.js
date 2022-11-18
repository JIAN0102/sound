import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore, collection } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: 'AIzaSyDXqTV6UjZd4lWZiWFq8ihK_gm6j-4uE8A',
  authDomain: 'sound-ebc19.firebaseapp.com',
  projectId: 'sound-ebc19',
  storageBucket: 'sound-ebc19.appspot.com',
  messagingSenderId: '291203938606',
  appId: '1:291203938606:web:c402f52640f870a11e22bf',
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
