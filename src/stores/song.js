import { reactive } from 'vue';
import { defineStore } from 'pinia';
import { query, where, getDocs } from 'firebase/firestore';
import { auth, songsCollection } from '@/plugins/firebase';

export const useSongStore = defineStore('song', () => {
  const songs = reactive([]);

  async function getSong() {
    songs.length = 0;
    const q = query(songsCollection, where('uid', '==', auth.currentUser.uid));
    const snapshot = await getDocs(q);

    snapshot.forEach((document) => {
      const song = {
        ...document.data(),
        docID: document.id,
      };
      songs.push(song);
    });
  }

  return {
    songs,
    getSong,
  };
});
