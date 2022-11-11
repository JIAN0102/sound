<script setup>
import { ref, reactive, onMounted } from 'vue';
import { query, where, getDocs } from 'firebase/firestore';
import { auth, songsCollection } from '@/plugins/firebase';
import BaseCard from '@/components/BaseCard.vue';
import SongUpload from '@/components/SongUpload.vue';
import SongModify from '@/components/SongModify.vue';

const songs = reactive([]);
const isLoading = ref(false);

function addSong(document) {
  const song = {
    ...document.data(),
    docID: document.id,
  };
  songs.push(song);
}

async function getSongs() {
  const q = query(songsCollection, where('uid', '==', auth.currentUser.uid));
  const snapshot = await getDocs(q);

  snapshot.forEach(addSong);
}

function getSongIndex(docID) {
  return songs.findIndex((song) => song.docID === docID);
}

function editSong(docID, { modifiedName, genre }) {
  const index = getSongIndex(docID);
  songs[index].modifiedName = modifiedName;
  songs[index].genre = genre;
}

function deleteSong(docID) {
  const index = getSongIndex(docID);
  songs.splice(index, 1);
}

onMounted(async () => {
  isLoading.value = true;

  await getSongs();

  isLoading.value = false;
});
</script>

<template>
  <div
    class="r:60 grid-cols:1 gap:30|40 p:100|0|210 p:180|80|210@md grid-cols:2@lg"
  >
    <div>
      <BaseCard>
        <template #header>
          <h1 class="f:bold f:24 fg:white t:center {f:28;t:left}@md">
            上傳歌曲
          </h1>
        </template>

        <template #main>
          <SongUpload @add-song="addSong" />
        </template>
      </BaseCard>
    </div>

    <div>
      <BaseCard>
        <template #header>
          <h2 class="f:bold f:24 fg:white t:center {f:28;t:left}@md">
            我的歌曲
          </h2>
        </template>

        <template #main>
          <div v-if="isLoading">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="w:24 h:24 mx:auto fg:white @rotate|1s|linear|infinite"
              viewBox="0 0 24 24"
              fill="none"
            >
              <circle
                class="opacity:.25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                stroke-width="4"
              ></circle>
              <path
                class="opacity:.75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
          </div>
          <ul v-else class="mt:20>li~li">
            <SongModify
              v-for="song in songs"
              :key="song.docID"
              :song="song"
              @edit-song="editSong"
              @delete-song="deleteSong"
            />
          </ul>
        </template>
      </BaseCard>
    </div>
  </div>
</template>
