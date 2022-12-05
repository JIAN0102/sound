<script setup>
import { ref, reactive, onMounted, watch, onBeforeUnmount, provide } from 'vue';
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
import emitter from '@/plugins/mitt';
import IconLoading from '@/components/icons/IconLoading.vue';
import SongModifyPreview from '@/components/SongModifyPreview.vue';

const isPending = ref(false);
const songs = reactive([]);
const documentsTotalLength = ref(0);
const limitDocumentRef = ref(null);
const limitLength = ref(9);

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
      limit(limitLength.value)
    );
    snapshots = await getDocs(q);
  } else {
    const q = query(
      songsCollection,
      where('uid', '==', auth.currentUser.uid),
      orderBy('createdAt', 'desc'),
      limit(limitLength.value)
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

function editSong(values) {
  const index = songs.findIndex((song) => song.docID === values.docID);
  songs[index] = values;
}

function deleteSong(docID) {
  const index = songs.findIndex((song) => song.docID === docID);
  songs.splice(index, 1);
}

async function getDocumentsTotalLength() {
  const q = query(songsCollection, where('uid', '==', auth.currentUser.uid));
  const snapshot = await getCountFromServer(q);
  documentsTotalLength.value = snapshot.data().count;
}

provide('song', {
  editSong,
});

watch(songs, () => {
  getDocumentsTotalLength();
});

onMounted(async () => {
  emitter.on('addSong', addSong);
  await getDocumentsTotalLength();
  window.addEventListener('scroll', handleScroll);
  getSongs();
});

onBeforeUnmount(() => {
  emitter.off('addSong', addSong);
  window.removeEventListener('scroll', handleScroll);
});
</script>

<template>
  <div ref="limitDocumentRef" class="rel">
    <ul class="bb:1|solid|white/.1>li">
      <TransitionGroup name="fade">
        <li v-for="song in songs" :key="song.docID">
          <SongModifyPreview :song="song" @delete-song="deleteSong" />
        </li>
      </TransitionGroup>
    </ul>
    <Transition name="fade">
      <div
        v-show="isPending"
        class="abs bottom:-20 left:1/2 fg:white translate(-50%,100%)"
      >
        <IconLoading :width="40" :height="40" />
      </div>
    </Transition>
  </div>
</template>
