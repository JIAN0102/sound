<script setup>
import { computed } from 'vue';
import { useRouter } from 'vue-router';
import { storeToRefs } from 'pinia';
import { usePlayerStore } from '@/stores/player';
import { formatDistanceToNow } from 'date-fns';
import { zhTW } from 'date-fns/locale';
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

const formattedCreatedAt = computed(() => {
  if (!props.song.createdAt) return;

  return formatDistanceToNow(props.song.createdAt.toDate(), {
    addSuffix: true,
    locale: zhTW,
  });
});

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
  <div>
    <div
      class="group rel"
      :class="{ 'is-active': song.uuid === currentSong.uuid }"
    >
      <div
        class="rel square overflow:hidden cursor:pointer bg:linear-gradient(135deg,#393939,#787878) r:4"
        @click="handleClick"
      >
        <img
          v-if="song.coverUrl"
          class="abs top:0 left:0 full obj:cover"
          :src="song.coverUrl"
          alt=""
        />
        <div
          class="abs inset:0 bg:linear-gradient(to|bottom,black/.5,transparent) opacity:0 invisible ~opacity|.3s,visibility|.3s .is-active_{opacity:1;visible} .group:hover_{opacity:1;visible}"
        ></div>
      </div>
      <button
        class="abs bottom:20 right:20 z:10 flex center-content w:48 h:48 fg:white bg:black rounded opacity:0 invisible ~opacity|.3s,visibility|.3s .is-active_{opacity:1;visible} .group:hover_{opacity:1;visible}"
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
    </div>
    <h2
      class="mt:12 f:bold fg:white cursor:pointer t:underline:hover"
      @click="handleClick"
    >
      {{ song.title }}
    </h2>
    <h3 class="mt:6 f:14 fg:#919191">
      {{ song.displayName }} • {{ song.genre }} • {{ formattedCreatedAt }}
    </h3>
  </div>
</template>
