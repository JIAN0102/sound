<script setup>
import { RouterLink } from 'vue-router';
import { storeToRefs } from 'pinia';
import { usePlayerStore } from '@/stores/player';

defineProps({
  song: {
    type: Object,
    required: true,
  },
});

const playerStore = usePlayerStore();
const { currentSong, isSoundPlaying } = storeToRefs(playerStore);
const { createSong } = playerStore;
</script>

<template>
  <div class="grid-col-span:4@xs">
    <div
      class="rel flex jc:space-between ai:center gap-x:20 h:80 pl:30 pr:10 bg:black rounded"
    >
      <RouterLink
        class="flex:1 lines:1"
        :to="{
          name: 'song',
          params: {
            id: song.docID,
          },
        }"
        :title="song.modifiedName"
      >
        <h3 class="f:bold fg:white f:18@md">
          {{ song.modifiedName }}
        </h3>
      </RouterLink>
      <button
        class="block w:60 h:60 bg:#333 rounded"
        type="button"
        @click.prevent="createSong(song)"
      >
        <div
          v-show="song.uuid !== currentSong.uuid || !isSoundPlaying"
          class="f:12 fg:white"
        >
          播放
        </div>
        <div
          v-show="song.uuid === currentSong.uuid && isSoundPlaying"
          class="f:12 fg:white"
        >
          暫停
        </div>
      </button>
    </div>
  </div>
</template>
