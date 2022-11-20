<script setup>
import { useRouter } from 'vue-router';
import { storeToRefs } from 'pinia';
import { usePlayerStore } from '@/stores/player';

const props = defineProps({
  song: {
    type: Object,
    required: true,
  },
});

const router = useRouter();

const playerStore = usePlayerStore();
const { currentSong, isSoundPlaying } = storeToRefs(playerStore);
const { createSong } = playerStore;

function handleClick() {
  if (!isSoundPlaying.value) {
    createSong(props.song);
  }
  router.push({
    name: 'song',
    params: {
      id: props.song.docID,
    },
  });
}
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
      <div
        class="flex:1 lines:1 cursor:pointer"
        :title="song.modifiedName"
        @click.prevent="handleClick"
      >
        <h3 class="f:bold fg:white f:18@md">
          {{ song.modifiedName }}
        </h3>
      </div>
    </div>
  </div>
</template>
