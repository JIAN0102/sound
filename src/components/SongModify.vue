<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import { auth, songsCollection } from '@/plugins/firebase';
import emitter from '@/plugins/mitt';
import { useLimitDocument } from '@/composables/useLimitDocument';
import BaseLoading from '@/components/BaseLoading.vue';
import SongModifyPreview from '@/components/SongModifyPreview.vue';
import SongModifyModal from '@/components/SongModifyModal.vue';

const collectionWhere = ['uid', '==', auth.currentUser.uid];

const {
  isPending,
  documents: songs,
  loadingObserverRef,
  addDocument: addSong,
  editDocument: editSong,
  deleteDocument: deleteSong,
} = useLimitDocument(12, songsCollection, collectionWhere);

const isModalOpen = ref(false);
const cacheSong = ref({});

function openModal(song) {
  isModalOpen.value = true;
  cacheSong.value = song;
  document.body.classList.add('overflow:hidden');
}

function closeModal() {
  isModalOpen.value = false;
  cacheSong.value = {};
  document.body.classList.remove('overflow:hidden');
}

onMounted(async () => {
  emitter.on('addSong', addSong);
});

onUnmounted(() => {
  emitter.off('addSong', addSong);
});
</script>

<template>
  <div class="rel mt:20 mt:30@md">
    <ul class="bb:1|solid|white/.1>li">
      <TransitionGroup name="fade">
        <li v-for="song in songs" :key="song.docID">
          <SongModifyPreview
            :song="song"
            @open-modal="openModal(song)"
            @close-modal="closeModal"
            @delete-song="deleteSong"
          />
        </li>
      </TransitionGroup>
    </ul>
    <div
      ref="loadingObserverRef"
      class="abs bottom:-20 left:1/2 fg:white translate(-50%,100%) opacity:0 invisible {opacity:1;visible}.is-active"
      :class="{ 'is-active': isPending }"
    >
      <BaseLoading />
    </div>
  </div>

  <Transition name="fade">
    <SongModifyModal
      v-if="isModalOpen"
      :song="cacheSong"
      @edit-song="editSong"
      @close-modal="closeModal"
    />
  </Transition>
</template>
