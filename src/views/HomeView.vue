<script setup>
import { useSong } from '@/composables/useSong';
import IconLoading from '@/components/icons/IconLoading.vue';
import SongPreview from '@/components/SongPreview.vue';

const { isPending, songs, songListRef } = useSong();
</script>

<template>
  <div class="pt:100vh">
    <div class="p:60|20|140 bg:black rt:40 {px:80;rt:60}@md">
      <div
        ref="songListRef"
        class="grid-cols:1 gap-y:20 {grid-cols:13;gap:40}@sm grid-col-start:2>div:nth(4n+3)@sm&<lg grid-col-start:2>div:nth(6n+4)@lg"
      >
        <TransitionGroup name="slide">
          <div
            v-for="song in songs"
            :key="song.docID"
            class="grid-col-span:6@sm grid-col-span:4@lg"
          >
            <SongPreview :song="song" />
          </div>
        </TransitionGroup>
      </div>
      <Transition name="fade">
        <div
          v-show="isPending"
          class="abs bottom:80 left:1/2 fg:white translateX(-50%)"
        >
          <IconLoading :width="40" :height="40" />
        </div>
      </Transition>
    </div>
  </div>
</template>
