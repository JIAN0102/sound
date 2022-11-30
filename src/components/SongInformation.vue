<script setup>
import { ref, computed, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { storeToRefs } from 'pinia';
import { formatDistanceToNow } from 'date-fns';
import { zhTW } from 'date-fns/locale';
import { doc, getDoc } from 'firebase/firestore';
import { songsCollection } from '@/plugins/firebase';
import { usePlayerStore } from '@/stores/player';
import IconPlay from '@/components/icons/IconPlay.vue';
import IconPause from '@/components/icons/IconPause.vue';

const route = useRoute();
const router = useRouter();

const playerStore = usePlayerStore();
const { currentSong, isSoundPlaying } = storeToRefs(playerStore);
const { createSong } = playerStore;

const song = ref({});

const formattedCreatedAt = computed(() => {
  if (!song.value.createdAt) return;

  return formatDistanceToNow(song.value.createdAt.toDate(), {
    addSuffix: true,
    locale: zhTW,
  });
});

onMounted(async () => {
  const snapshot = await getDoc(doc(songsCollection, route.params.id));

  if (!snapshot.exists()) {
    router.push({
      name: 'home',
    });
    return;
  }

  song.value = snapshot.data();
});
</script>

<template>
  <h1 class="f:bold f:24 fg:white t:center f:28@md">
    {{ song.title }}
  </h1>
  <div
    class="rel grid-cols:3 mt:20 t:center mt:30@md {content:'';abs;top:1/2;left:0;w:3;h:30;bg:#777;translateY(-50%)}>div~div::before"
  >
    <div class="rel">
      <span class="f:12 fg:#777 f:14@md">曲風</span>
      <h3 class="mt:4 f:bold fg:white f:20@md">{{ song.genre }}</h3>
    </div>
    <div class="rel">
      <span class="f:12 fg:#777 f:14@md">上傳者</span>
      <h3 class="mt:4 f:bold fg:white f:20@md">
        {{ song.displayName }}
      </h3>
    </div>
    <div class="rel">
      <span class="f:12 fg:#777 f:14@md">上傳時間</span>
      <h3 class="mt:4 f:bold fg:white f:20@md">
        {{ formattedCreatedAt }}
      </h3>
    </div>
  </div>
  <button
    class="group rel w:full mt:20 rounded bg:primary mt:30@md @backgroundGradient|2s|linear|infinite:hover"
    type="button"
    @click.prevent="createSong(song)"
  >
    <div
      class="abs inset:0 rounded opacity:0 @backgroundGradient|2s|linear|infinite ~opacity|.3s .group:hover_{opacity:1}"
    ></div>
    <div class="rel flex center-content h:60">
      <div
        class="abs top:1/2 left:10 flex center-content w:40 h:40 fg:white bg:black rounded translateY(-50%)"
      >
        <IconPause
          v-if="song.uuid === currentSong.uuid && isSoundPlaying"
          :width="16"
          :height="16"
        />
        <IconPlay v-else :width="16" :height="16" />
      </div>
      <h4
        v-if="song.uuid === currentSong.uuid && isSoundPlaying"
        class="f:bold"
      >
        暫停
      </h4>
      <h4 v-else class="f:bold">播放</h4>
    </div>
  </button>
</template>
