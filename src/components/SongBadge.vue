<script setup>
import { songsCollection } from '@/plugins/firebase';
import { useLimitDocument } from '@/composables/useLimitDocument';
import BaseLoading from '@/components/BaseLoading.vue';
import SongBadgePreview from '@/components/SongBadgePreview.vue';

const {
  isPending,
  documents: songs,
  loadingObserverRef,
} = useLimitDocument(12, songsCollection);
</script>

<template>
  <div class="rel mt:20 mt:30@md">
    <ul class="bb:1|solid|white/.1>li">
      <TransitionGroup name="fade">
        <li v-for="song in songs" :key="song.docID">
          <SongBadgePreview :song="song" />
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
</template>
