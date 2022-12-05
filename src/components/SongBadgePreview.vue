<script setup>
import { computed } from 'vue';
import { RouterLink } from 'vue-router';
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

const playerStore = usePlayerStore();
const { currentSong, isSoundPlaying } = storeToRefs(playerStore);
const { createSong, createSongWhenNotPlaying } = playerStore;

const formattedCreatedAt = computed(() => {
  if (!props.song.createdAt) return;

  return formatDistanceToNow(props.song.createdAt.toDate(), {
    addSuffix: true,
    locale: zhTW,
  });
});
</script>

<template>
  <div
    class="group flex ai:center gap-x:16 p:8 r:4 bg:#212121:is(.is-active,:hover)"
    :class="{ 'is-active': song.docID === currentSong.docID }"
  >
    <div
      class="rel square w:64 overflow:hidden cursor:pointer r:4"
      :class="{ 'bg:linear-gradient(145deg,#383838,#767676)': !song.coverUrl }"
    >
      <img
        v-if="song.coverUrl"
        class="abs top:0 left:0 full obj:cover"
        :src="song.coverUrl"
        alt=""
      />
      <div
        class="abs inset:0 z:10 flex center-content fg:white bg:black/.9 opacity:0 invisible :is(.is-active,.group:hover)_{opacity:1;visible}"
        @click="createSong(song)"
      >
        <button type="button">
          <IconPause
            v-if="song.docID === currentSong.docID && isSoundPlaying"
            :width="20"
            :height="20"
          />
          <IconPlay v-else :width="20" :height="20" />
        </button>
      </div>
    </div>
    <div class="flex:1">
      <RouterLink
        class="f:bold fg:white lines:1"
        :to="{
          name: 'song',
          params: {
            id: song.docID,
          },
        }"
        @click="createSongWhenNotPlaying(song)"
      >
        {{ song.title }}
      </RouterLink>
      <h3 class="mt:4 f:14 fg:white/.5 lines:1">
        {{ song.displayName }} • {{ song.genre }} • {{ formattedCreatedAt }}
      </h3>
    </div>
  </div>
</template>
