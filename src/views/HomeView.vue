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
  getCountFromServer,
} from 'firebase/firestore';
import { songsCollection } from '@/plugins/firebase';
import SongPreview from '@/components/SongPreview.vue';
import IconLoading from '@/components/icons/IconLoading.vue';

const songs = reactive([]);
const songsTotalLength = ref(0);
const perPage = ref(9);
const isPending = ref(false);

function handleScroll() {
  const { scrollTop, offsetHeight } = document.documentElement;
  const { innerHeight } = window;
  const bottomOfWindow =
    offsetHeight - (Math.round(scrollTop) + innerHeight) <= 100;

  if (bottomOfWindow) {
    getSongs();
  }
}

async function getSongs() {
  if (isPending.value || songs.length >= songsTotalLength.value) return;

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

  setTimeout(() => {
    snapshots.forEach((document) => {
      songs.push({
        ...document.data(),
        docID: document.id,
      });
    });

    isPending.value = false;
  }, 1000);
}

onMounted(async () => {
  const snapshot = await getCountFromServer(songsCollection);
  songsTotalLength.value = snapshot.data().count;

  window.addEventListener('scroll', handleScroll);
  getSongs();
});

onBeforeUnmount(() => {
  window.removeEventListener('scroll', handleScroll);
});
</script>

<template>
  <div class="p:60|20|140 mt:100vh bg:black rt:40 {px:80;rt:60}@md">
    <div
      class="grid-cols:1 gap-y:20 {grid-cols:13;gap:40}@sm grid-col-start:2>div:nth(4n+3)@sm&<lg grid-col-start:2>div:nth(6n+4)@lg"
    >
      <TransitionGroup name="slide">
        <SongPreview v-for="song in songs" :key="song.docID" :song="song" />
      </TransitionGroup>
    </div>
    <Transition name="fadeUp">
      <div
        v-show="isPending"
        class="abs bottom:80 left:1/2 fg:white translateX(-50%)"
      >
        <IconLoading :width="40" :height="40" />
      </div>
    </Transition>
  </div>
</template>
