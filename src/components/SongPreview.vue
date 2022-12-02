<script setup>
import { useRouter } from 'vue-router';
import { storeToRefs } from 'pinia';
import { usePlayerStore } from '@/stores/player';
import IconPlay from '@/components/icons/IconPlay.vue';
import IconPause from '@/components/icons/IconPause.vue';
import IconMore from '@/components/icons/IconMore.vue';

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
      class="rel bg:#333 rounded ~background-color|.3s bg:#555:hover"
      :class="{ 'is-active': song.uuid === currentSong.uuid }"
    >
      <div
        class="abs inset:0 rounded opacity:0 @backgroundGradient|2s|linear|infinite ~opacity|.3s .is-active_{opacity:1}"
      ></div>
      <button
        class="abs top:1/2 left:10 z:10 flex center-content w:60 h:60 fg:white bg:black rounded translateY(-50%)"
        type="button"
        @click="createSong(song)"
      >
        <IconPause
          v-if="song.uuid === currentSong.uuid && isSoundPlaying"
          :width="20"
          :height="20"
        />
        <IconPlay v-else :width="20" :height="20" />
      </button>
      <div
        class="group rel flex ai:center gap-x:10 h:80 pl:80 pr:30 overflow:hidden fg:white cursor:pointer rounded .is-active_{fg:black}"
        :title="song.title"
        @click="handleClick"
      >
        <h3 class="rel z:10 flex:1 f:bold lines:1 f:18@md">
          {{ song.title }}
        </h3>
        <div
          class="{opacity:0;translateX(100%);~opacity|.3s,transform|.3s}@md .group:hover_{opacity:1;translateX(0)}@md"
        >
          <IconMore />
        </div>
      </div>
    </div>
  </div>
</template>
