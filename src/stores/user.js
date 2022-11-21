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
  const isLoggedIn = ref(false);

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
    isLoggedIn.value = true;
  }

  async function login({ email, password }) {
    await signInWithEmailAndPassword(auth, email, password);
    isLoggedIn.value = true;
  }

  async function logout() {
    await signOut(auth);
    isLoggedIn.value = false;
  }

  return {
    isLoggedIn,
    register,
    login,
    logout,
  };
});
