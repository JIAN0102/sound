<script setup>
import { songsCollection } from '@/plugins/firebase';
import { useLimitDocument } from '@/composables/useLimitDocument';
import BaseLoading from '@/components/BaseLoading.vue';
import SongGalleryPreview from '@/components/SongGalleryPreview.vue';

const {
  isPending,
  documents: songs,
  limitDocumentRef,
} = useLimitDocument(12, songsCollection);
</script>

<template>
  <div class="pt:100vh">
    <div class="p:50|20|140 bg:#030303 rt:40 {p:80|40|140;rt:60}@md px:80@lg">
      <div class="max-w:1500 mx:auto">
        <h1 class="f:bold f:24 fg:white f:32@sm f:40@md">探索歌曲</h1>
        <div ref="limitDocumentRef" class="rel">
          <div
            class="grid-cols:2 gap:40|24 mt:20 grid-cols:3@sm {grid-cols:4;mt:30}@md grid-cols:5@lg grid-cols:6@xl"
          >
            <TransitionGroup name="fade">
              <div v-for="song in songs" :key="song.docID">
                <SongGalleryPreview :song="song" />
              </div>
            </TransitionGroup>
          </div>
          <Transition name="fade">
            <div
              v-show="isPending"
              class="abs bottom:-20 left:1/2 translate(-50%,100%)"
            >
              <BaseLoading />
            </div>
          </Transition>
        </div>
      </div>
    </div>
  </div>
</template>
