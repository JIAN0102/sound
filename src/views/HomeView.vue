<script setup>
import { ref, reactive, onMounted, onBeforeUnmount } from 'vue';
import {
  query,
  orderBy,
  startAfter,
  limit,
  doc,
  getDoc,
  getDocs,
} from 'firebase/firestore';
import { songsCollection } from '@/plugins/firebase';
import SongItem from '@/components/SongItem.vue';

const songs = reactive([]);
const perPage = ref(9);
const isPending = ref(false);

function handleScroll() {
  const { scrollTop, offsetHeight } = document.documentElement;
  const { innerHeight } = window;
  const bottomOfWindow = Math.round(scrollTop) + innerHeight === offsetHeight;

  if (bottomOfWindow) {
    getSongs();
  }
}

async function getSongs() {
  if (isPending.value) return;

  isPending.value = true;

  let snapshots;

  if (songs.length) {
    const lastDoc = await getDoc(
      doc(songsCollection, songs[songs.length - 1].docID)
    );
    const q = query(
      songsCollection,
      orderBy('title'),
      startAfter(lastDoc),
      limit(perPage.value)
    );
    snapshots = await getDocs(q);
  } else {
    const q = query(songsCollection, orderBy('title'), limit(perPage.value));
    snapshots = await getDocs(q);
  }

  snapshots.forEach((document) => {
    songs.push({
      ...document.data(),
      docID: document.id,
    });
  });

  isPending.value = false;
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll);
  getSongs();
});

onBeforeUnmount(() => {
  window.removeEventListener('scroll', handleScroll);
});
</script>

<template>
  <div class="p:60|20|100 mt:100vh bg:black rt:40 {px:80;rt:60}@md">
    <div
      class="grid-cols:1 gap-y:20 {grid-cols:13;gap:40}@sm grid-col-start:2>div:nth(4n+3)@sm&<lg grid-col-start:2>div:nth(6n+4)@lg"
    >
      <SongItem v-for="song in songs" :key="song.docID" :song="song" />
    </div>
  </div>
</template>
