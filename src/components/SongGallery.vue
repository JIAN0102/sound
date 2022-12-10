<script setup>
import { songsCollection } from '@/plugins/firebase';
import { useLimitDocument } from '@/composables/useLimitDocument';
import BaseLoading from '@/components/BaseLoading.vue';
import SongGalleryPreview from '@/components/SongGalleryPreview.vue';

const {
  isPending,
  documents: songs,
  loadingObserverRef,
} = useLimitDocument(12, songsCollection);
</script>

<template>
  <div class="rel mt:20 mt:30@md">
    <div
      class="grid-cols:2 gap:40|24 grid-cols:3@sm grid-cols:4@md grid-cols:5@lg grid-cols:6@xl"
    >
      <TransitionGroup name="fade">
        <div v-for="song in songs" :key="song.docID">
          <SongGalleryPreview :song="song" />
        </div>
      </TransitionGroup>
    </div>
    <div
      ref="loadingObserverRef"
      class="abs bottom:-20 left:1/2 fg:white translate(-50%,100%) opacity:0 invisible {opacity:1;visible}.is-active"
      :class="{ 'is-active': isPending }"
    >
      <BaseLoading />
    </div>
  </div>
</template>
