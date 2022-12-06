<script setup>
import { onMounted, onBeforeUnmount, provide } from 'vue';
import { where } from 'firebase/firestore';
import { auth, songsCollection } from '@/plugins/firebase';
import { useLimitDocument } from '@/composables/useLimitDocument';
import emitter from '@/plugins/mitt';
import BaseLoading from '@/components/BaseLoading.vue';
import SongModifyPreview from '@/components/SongModifyPreview.vue';

const collectionQuery = where('uid', '==', auth.currentUser.uid);

const {
  isPending,
  documents: songs,
  limitDocumentRef,
  addDocument: addSong,
  editDocument: editSong,
  deleteDocument: deleteSong,
} = useLimitDocument(12, songsCollection, collectionQuery);

provide('song', {
  editSong,
});

onMounted(async () => {
  emitter.on('addSong', addSong);
});

onBeforeUnmount(() => {
  emitter.off('addSong', addSong);
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
        class="abs bottom:-20 left:1/2 translate(-50%,100%)"
      >
        <BaseLoading />
      </div>
    </Transition>
  </div>
</template>
