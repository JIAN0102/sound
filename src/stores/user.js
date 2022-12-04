import { ref } from 'vue';
import { defineStore } from 'pinia';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { auth, usersCollection } from '@/plugins/firebase';

export const useUserStore = defineStore('user', () => {
  const isLoggedIn = ref(!!auth.currentUser);

  async function register({ name, email, password }) {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const userRef = doc(usersCollection, userCredential.user.uid);
    await setDoc(userRef, {
      name,
      email,
    });
    await updateProfile(userCredential.user, {
      displayName: name,
    });
  }

  async function login({ email, password }) {
    await signInWithEmailAndPassword(auth, email, password);
  }

  async function logout() {
    await signOut(auth);
  }

  return {
    isLoggedIn,
    register,
    login,
    logout,
  };
});
