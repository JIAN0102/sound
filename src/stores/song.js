import { ref } from 'vue';
import { defineStore } from 'pinia';
import {
  query,
  where,
  doc,
  getDocs,
  updateDoc,
  deleteDoc,
} from 'firebase/firestore';
import { ref as storageRef, deleteObject } from 'firebase/storage';
import { auth, storage, songsCollection } from '@/plugins/firebase';

export const useSongStore = defineStore('song', () => {
  const songs = ref([]);

  async function getSongs() {
    songs.value = [];

    const q = query(songsCollection, where('uid', '==', auth.currentUser.uid));
    const snapshot = await getDocs(q);

    snapshot.forEach(addSong);
  }

  function addSong(document) {
    songs.value.push({
      ...document.data(),
      docID: document.id,
    });
  }

  async function editSong(docID, values) {
    await updateDoc(doc(songsCollection, docID), values);

    const index = songs.value.findIndex((song) => song.docID === docID);
    songs.value[index].title = values.title;
    songs.value[index].genre = values.genre;
  }

  async function deleteSong(docID, uuid) {
    const songRef = storageRef(storage, `songs/${uuid}`);

    await deleteObject(songRef);
    await deleteDoc(doc(songsCollection, docID));

    const index = songs.value.findIndex((song) => song.docID === docID);
    songs.value.splice(index, 1);
  }

  return {
    songs,
    getSongs,
    addSong,
    editSong,
    deleteSong,
  };
});
