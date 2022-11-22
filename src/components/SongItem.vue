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
      class="rel bg:#333 rounded ~background-color|.3s"
      :class="{ 'is-active': song.uuid === currentSong.uuid }"
    >
      <div
        class="abs inset:0 rounded opacity:0 @backgorundColor|2s|linear|infinite ~opacity|.3s .is-active_{opacity:1}"
      ></div>
      <div
        class="rel flex jc:space-between ai:center gap-x:20 h:80 pl:10 pr:30"
      >
        <button
          class="flex center-content w:60 h:60 fg:white bg:black rounded"
          type="button"
          @click.prevent="createSong(song)"
        >
          <IconPause
            v-if="song.uuid === currentSong.uuid && isSoundPlaying"
            :width="20"
            :height="20"
          />
          <IconPlay v-else :width="20" :height="20" />
        </button>
        <div
          class="flex:1 lines:1 cursor:pointer"
          :title="song.title"
          @click.prevent="handleClick"
        >
          <h3 class="f:bold fg:white f:18@md .is-active_{fg:black}">
            {{ song.title }}
          </h3>
        </div>
      </div>
    </div>
  </div>
</template>
