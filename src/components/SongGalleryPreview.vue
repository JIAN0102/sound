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
  <div>
    <div
      class="group rel"
      :class="{ 'is-active': song.docID === currentSong.docID }"
    >
      <RouterLink
        class="rel square block overflow:hidden r:4"
        :class="{
          'bg:linear-gradient(145deg,#383838,#767676)': !song.coverUrl,
        }"
        :to="{
          name: 'song',
          params: {
            id: song.docID,
          },
        }"
        @click="createSongWhenNotPlaying(song)"
      >
        <img
          v-if="song.coverUrl"
          class="abs top:0 left:0 full obj:cover r:4"
          :src="song.coverUrl"
          alt=""
        />
        <div
          class="abs inset:0 bg:linear-gradient(to|bottom,black/.5,transparent) opacity:0 invisible ~opacity|.3s,visibility|.3s :is(.is-active,.group:hover)_{opacity:1;visible}"
        ></div>
      </RouterLink>
      <button
        class="abs bottom:20 right:20 z:10 flex center-content w:48 h:48 fg:white bg:#030303 rounded opacity:0 invisible ~opacity|.3s,visibility|.3s :is(.is-active,.group:hover)_{opacity:1;visible}"
        type="button"
        @click="createSong(song)"
      >
        <IconPause
          v-if="song.docID === currentSong.docID && isSoundPlaying"
          :width="20"
          :height="20"
        />
        <IconPlay v-else :width="20" :height="20" />
      </button>
    </div>
    <RouterLink
      class="block mt:16 f:bold fg:white t:underline:hover"
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
    <h3 class="mt:6 f:14 fg:white/.5">
      {{ song.displayName }} • {{ song.genre }} • {{ formattedCreatedAt }}
    </h3>
  </div>
</template>
