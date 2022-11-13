<script setup>
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { storeToRefs } from 'pinia';
import { doc, getDoc } from 'firebase/firestore';
import { songsCollection } from '@/plugins/firebase';
import { usePlayerStore } from '@/stores/player';

const route = useRoute();
const router = useRouter();

const playerStore = usePlayerStore();
const { currentSong, isSoundPlaying } = storeToRefs(playerStore);
const { createSong } = playerStore;

const song = ref({});

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
  <div
    class="rel grid-cols:3 t:center {content:'';abs;top:1/2;left:0;w:3;h:30;bg:#777;translateY(-50%)}>div~div::before"
  >
    <div class="rel">
      <span class="f:12 fg:#777 f:16@md">歌曲名稱</span>
      <h3 class="mt:4 f:bold fg:white f:24@md">
        {{ song.modifiedName }}
      </h3>
    </div>
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
        class="abs top:1/2 left:14 w:32 h:32 bg:black rounded translateY(-50%)"
      ></span>
      <div v-if="song.uuid !== currentSong.uuid || !isSoundPlaying">播放</div>
      <div v-else>暫停</div>
    </div>
  </button>
</template>
