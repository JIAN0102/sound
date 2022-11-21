<script setup>
import { useRouter } from 'vue-router';
import { storeToRefs } from 'pinia';
import { usePlayerStore } from '@/stores/player';
import IconPlay from '@/components/icons/IconPlay.vue';
import IconPause from '@/components/icons/IconPause.vue';

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
  <div class="grid-col-span:6@sm grid-col-span:4@lg">
    <div
      class="rel flex jc:space-between ai:center gap-x:20 h:80 pl:10 pr:30 bg:#333 rounded"
    >
      <button
        class="flex center-content w:60 h:60 fg:white bg:black rounded"
        type="button"
        @click.prevent="createSong(song)"
      >
        <IconPause v-if="song.uuid === currentSong.uuid && isSoundPlaying" />
        <IconPlay v-else />
      </button>
      <div
        class="flex:1 lines:1 cursor:pointer"
        :title="song.title"
        @click.prevent="handleClick"
      >
        <h3 class="f:bold fg:white f:18@md">
          {{ song.title }}
        </h3>
      </div>
    </div>
  </div>
</template>
