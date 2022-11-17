import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore, collection } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: 'AIzaSyBK3RgGAAA55BWGxswVYC7LQ5w3rGdWg8U',
  authDomain: 'music-22e46.firebaseapp.com',
  projectId: 'music-22e46',
  storageBucket: 'music-22e46.appspot.com',
  messagingSenderId: '610467619693',
  appId: '1:610467619693:web:385508805c5e10d7f8b064',
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
