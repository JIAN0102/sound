<script setup>
import { reactive, onMounted } from 'vue';
import { query, where, getDocs } from 'firebase/firestore';
import { auth, songsCollection } from '@/plugins/firebase';
import BaseCard from '@/components/BaseCard.vue';
import SongUpload from '@/components/SongUpload.vue';
import SongModify from '@/components/SongModify.vue';

const songs = reactive([]);

function uploadSong(document) {
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
  const q = query(songsCollection, where('uid', '==', auth.currentUser.uid));
  const snapshot = await getDocs(q);

  snapshot.forEach(uploadSong);
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
          <SongUpload @upload-song="uploadSong" />
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
          <ul class="mt:20>li~li">
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
