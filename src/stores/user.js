import { ref } from 'vue';
import { defineStore } from 'pinia';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { auth, usersCollection } from '@/includes/firebase';

export const useUserStore = defineStore('user', () => {
  const isLoggedIn = ref(false);

  function toggleAuth() {
    isLoggedIn.value = !isLoggedIn.value;
  }

  async function register({ name, email, password }) {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );

    const docRef = doc(usersCollection, userCredential.user.uid);

    await setDoc(docRef, {
      name,
      email,
    });

    await updateProfile(userCredential.user, {
      displayName: name,
    });

    toggleAuth();
  }

  async function login({ email, password }) {
    await signInWithEmailAndPassword(auth, email, password);

    toggleAuth();
  }

  async function logout() {
    await signOut(auth);

    toggleAuth();
  }

  return {
    isLoggedIn,
    toggleAuth,
    register,
    login,
    logout,
  };
});
