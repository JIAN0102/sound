<script setup>
import { ref, onMounted } from 'vue';
import BaseCard from '@/components/BaseCard.vue';
import SongUpload from '@/components/SongUpload.vue';
import SongModify from '@/components/SongModify.vue';
import { useSongStore } from '@/stores/song';

const songStore = useSongStore();
const { songs, getSongs } = songStore;

const isLoading = ref(false);

function addSong(document) {
  const song = {
    ...document.data(),
    docID: document.id,
  };
  songs.push(song);
}

function editSong(docID, { modifiedName, genre }) {
  const index = songs.findIndex((song) => song.docID === docID);
  songs[index].modifiedName = modifiedName;
  songs[index].genre = genre;
}

function deleteSong(docID) {
  const index = songs.findIndex((song) => song.docID === docID);
  songs.splice(index, 1);
}

onMounted(async () => {
  isLoading.value = true;
  await getSongs();
  setTimeout(() => {
    isLoading.value = false;
  }, 1000);
});
</script>

<template>
  <div class="grid-cols:1 gap:30|40 p:100|0|210 p:180|80|210@md grid-cols:2@lg">
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
          <div v-if="isLoading" class="f:16 fg:white">讀取中...</div>
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
