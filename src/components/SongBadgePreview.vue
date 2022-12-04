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
  <div
    class="group flex ai:center gap-x:16 p:6 r:4 bg:#393939:is(.is-active,:hover)"
    :class="{ 'is-active': song.uuid === currentSong.uuid }"
  >
    <div
      class="rel square w:64 overflow:hidden cursor:pointer bg:linear-gradient(135deg,#787878,#393939) r:4"
    >
      <img
        v-if="song.coverUrl"
        class="abs top:0 left:0 full obj:cover"
        :src="song.coverUrl"
        alt=""
      />
      <div
        class="abs inset:0 z:10 flex center-content fg:white bg:black/.75 opacity:0 invisible .is-active_{opacity:1;visible} .group:hover_{opacity:1;visible}"
        @click="createSong(song)"
      >
        <button type="button">
          <IconPause
            v-if="song.uuid === currentSong.uuid && isSoundPlaying"
            :width="20"
            :height="20"
          />
          <IconPlay v-else :width="20" :height="20" />
        </button>
      </div>
    </div>
    <div class="flex flex:col ai:flex-start gap-y:6 flex:1">
      <h2
        class="f:bold fg:white lines:1 cursor:pointer t:underline:hover"
        @click="handleClick"
      >
        {{ song.title }}
      </h2>
      <h3 class="f:14 fg:#919191">
        {{ song.displayName }} • {{ song.genre }} • {{ formattedCreatedAt }}
      </h3>
    </div>
  </div>
</template>
