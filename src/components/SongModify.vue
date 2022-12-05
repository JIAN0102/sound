<script setup>
import { ref, reactive, onMounted, onBeforeUnmount, provide } from 'vue';
import {
  query,
  where,
  orderBy,
  startAfter,
  limit,
  doc,
  getDoc,
  getDocs,
  getCountFromServer,
} from 'firebase/firestore';
import { auth, songsCollection } from '@/plugins/firebase';
import IconLoading from '@/components/icons/IconLoading.vue';
import SongModifyPreview from '@/components/SongModifyPreview.vue';

const isPending = ref(false);
const songs = reactive([]);
const documentsTotalLength = ref(0);
const limitDocumentRef = ref(null);
const perPage = ref(12);

function handleScroll() {
  const { scrollTop } = document.documentElement;
  const { innerHeight } = window;
  const documentsOffsetTop = limitDocumentRef.value?.offsetTop;
  const documentsHeight =
    limitDocumentRef.value?.getBoundingClientRect().height;

  const bottomOfDocuments =
    scrollTop + innerHeight - (documentsOffsetTop + documentsHeight) >= -100;

  if (bottomOfDocuments) {
    getSongs();
  }
}

async function getSongs() {
  if (isPending.value || songs.length >= documentsTotalLength.value) return;

  isPending.value = true;

  let snapshots;

  if (songs.length) {
    const lastDoc = await getDoc(
      doc(songsCollection, songs[songs.length - 1].docID)
    );
    const q = query(
      songsCollection,
      where('uid', '==', auth.currentUser.uid),
      orderBy('createdAt', 'desc'),
      startAfter(lastDoc),
      limit(perPage.value)
    );
    snapshots = await getDocs(q);
  } else {
    const q = query(
      songsCollection,
      where('uid', '==', auth.currentUser.uid),
      orderBy('createdAt', 'desc'),
      limit(perPage.value)
    );
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

function addSong(document) {
  songs.unshift({
    ...document.data(),
    docID: document.id,
  });
}

function editSong(docID, values) {
  const index = songs.findIndex((song) => song.docID === docID);
  songs[index] = values;
}

function deleteSong(docID) {
  const index = songs.findIndex((song) => song.docID === docID);
  songs.splice(index, 1);
}

onMounted(async () => {
  const q = query(songsCollection, where('uid', '==', auth.currentUser.uid));
  const snapshot = await getCountFromServer(q);
  documentsTotalLength.value = snapshot.data().count;

  window.addEventListener('scroll', handleScroll);
  getSongs();
});

onBeforeUnmount(() => {
  window.removeEventListener('scroll', handleScroll);
});

provide('song', {
  editSong,
});

defineExpose({
  addSong,
});
</script>

<template>
  <h3 v-if="!songs.length" class="fg:white">
    目前沒有任何歌曲，試著上傳看看吧!
  </h3>
  <ul v-else ref="limitDocumentRef" class="bb:1|solid|white/.1>li">
    <TransitionGroup name="slide">
      <li v-for="song in songs" :key="song.docID">
        <SongModifyPreview :song="song" @delete-song="deleteSong" />
      </li>
    </TransitionGroup>
  </ul>
  <Transition name="fade">
    <div
      v-show="isPending"
      class="abs bottom:80 left:1/2 fg:white translateX(-50%)"
    >
      <IconLoading :width="40" :height="40" />
    </div>
  </Transition>
</template>
