import { ref } from 'vue';
import { defineStore } from 'pinia';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { auth, usersCollection } from '@/includes/firebase';

export const useUserStore = defineStore('user', () => {
  const isLoggedIn = ref(false);

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

    isLoggedIn.value = true;
  }

  return { isLoggedIn, register };
});
