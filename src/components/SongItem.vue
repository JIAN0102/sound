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
      class="rel flex jc:space-between ai:center gap-x:20 h:80 pl:10 pr:30 bg:#333 rounded"
    >
      <button
        class="flex center-content w:60 h:60 bg:black rounded"
        type="button"
        @click.prevent="createSong(song)"
      >
        <div
          v-show="song.uuid !== currentSong.uuid || !isSoundPlaying"
          class="f:12 fg:white"
        >
          <img src="/assets/img/icon-play.svg" alt="" />
        </div>
        <div
          v-show="song.uuid === currentSong.uuid && isSoundPlaying"
          class="f:12 fg:white"
        >
          <img src="/assets/img/icon-pause.svg" alt="" />
        </div>
      </button>
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
    </div>
  </div>
</template>
