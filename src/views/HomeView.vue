<script setup>
import { useSong } from '@/composables/useSong';
import IconLoading from '@/components/icons/IconLoading.vue';
import SongPreview from '@/components/SongPreview.vue';

const { isPending, songs, songListRef } = useSong();
</script>

<template>
  <div class="pt:100vh">
    <div class="p:60|20|120 bg:black rt:40 {px:80;rt:60}@md">
      <h1 class="f:bold f:24 fg:white f:32@sm f:40@md">探索歌曲</h1>
      <div
        ref="songListRef"
        class="grid-cols:2 gap:24 mt:20 grid-cols:3@sm grid-cols:4@md grid-cols:5@lg grid-cols:6@xl"
      >
        <TransitionGroup name="fade">
          <div v-for="song in songs" :key="song.docID">
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
