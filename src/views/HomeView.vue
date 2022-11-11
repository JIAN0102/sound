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
const maxPerPage = ref(9);
const pendingRequest = ref(false);

function handleScroll() {
  const { scrollTop, offsetHeight } = document.documentElement;
  const { innerHeight } = window;
  const bottomOfWindow = Math.round(scrollTop) + innerHeight === offsetHeight;

  if (bottomOfWindow) {
    getSongs();
  }
}

async function getSongs() {
  if (pendingRequest.value) return;

  pendingRequest.value = true;

  let snapshots;

  if (songs.length) {
    const lastDoc = await getDoc(
      doc(songsCollection, songs[songs.length - 1].docID)
    );
    const q = query(
      songsCollection,
      orderBy('modifiedName'),
      startAfter(lastDoc),
      limit(maxPerPage.value)
    );
    snapshots = await getDocs(q);
  } else {
    const q = query(
      songsCollection,
      orderBy('modifiedName'),
      limit(maxPerPage.value)
    );
    snapshots = await getDocs(q);
  }

  snapshots.forEach((document) => {
    songs.push({
      ...document.data(),
      docID: document.id,
    });
  });

  pendingRequest.value = false;
}

onMounted(() => {
  getSongs();

  window.addEventListener('scroll', handleScroll);
});

onBeforeUnmount(() => {
  window.removeEventListener('scroll', handleScroll);
});
</script>

<template>
  <div
    class="mt:100vh px:20 pt:80 pb:210 bg:linear-gradient(transparent,#333) px:80@md"
  >
    <div
      class="grid-cols:1 gap:40 grid-cols:9@xs grid-cols:13@lg grid-col-start:2>div:nth(4n+3)@xs&<lg grid-col-start:2>div:nth(6n+4)@lg"
    >
      <SongItem v-for="song in songs" :key="song.docID" :song="song" />
    </div>
  </div>
</template>
