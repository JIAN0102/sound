<script setup>
import { ref, computed, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { storeToRefs } from 'pinia';
import { formatDistanceToNow } from 'date-fns';
import { zhTW } from 'date-fns/locale';
import { doc, getDoc } from 'firebase/firestore';
import { songsCollection } from '@/plugins/firebase';
import { usePlayerStore } from '@/stores/player';

const route = useRoute();
const router = useRouter();

const playerStore = usePlayerStore();
const { currentSong, isSoundPlaying } = storeToRefs(playerStore);
const { createSong } = playerStore;

const song = ref({});

const formattedTime = computed(() => {
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
    {{ song.modifiedName }}
  </h1>
  <div
    class="rel grid-cols:3 mt:20 t:center mt:30@md {content:'';abs;top:1/2;left:0;w:3;h:30;bg:#777;translateY(-50%)}>div~div::before"
  >
    <div class="rel">
      <span class="f:12 fg:#777 f:16@md">曲風</span>
      <h3 class="mt:4 f:bold fg:white f:24@md">{{ song.genre }}</h3>
    </div>
    <div class="rel">
      <span class="f:12 fg:#777 f:16@md">上傳者</span>
      <h3 class="mt:4 f:bold fg:white f:24@md">
        {{ song.displayName }}
      </h3>
    </div>
    <div class="rel">
      <span class="f:12 fg:#777 f:16@md">上傳時間</span>
      <h3 class="mt:4 f:bold fg:white f:24@md">
        {{ formattedTime }}
      </h3>
    </div>
  </div>
  <button
    class="group rel w:full mt:20 mt:30@md"
    type="button"
    @click.prevent="createSong(song)"
  >
    <div
      class="abs top:1/2 left:1/2 full bg:linear-gradient(to|right,primary,secondary) rounded translate(-50%,-50%) .group:hover_{animation:bounce|1s|infinite}"
    ></div>
    <div class="rel flex center-content h:60">
      <span
        class="abs top:1/2 left:14 flex center-content w:32 h:32 bg:black rounded translateY(-50%)"
      >
        <img
          v-show="song.uuid !== currentSong.uuid || !isSoundPlaying"
          class="w:18"
          src="/assets/img/icon-play.svg"
          alt=""
        />
        <img
          v-show="song.uuid === currentSong.uuid && isSoundPlaying"
          class="w:18"
          src="/assets/img/icon-pause.svg"
          alt=""
        />
      </span>
      <h4
        v-show="song.uuid !== currentSong.uuid || !isSoundPlaying"
        class="f:bold"
      >
        播放
      </h4>
      <h4
        v-show="song.uuid === currentSong.uuid && isSoundPlaying"
        class="f:bold"
      >
        暫停
      </h4>
    </div>
  </button>
</template>
