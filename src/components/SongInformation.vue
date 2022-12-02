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
  <div class="{flex;gap-x:40}@sm">
    <div
      class="square bg:#555 bg:url('https://images.unsplash.com/photo-1669837246150-861dfbd0d31f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1976&q=80')|center/cover r:30 w:300@sm w:400@md"
    ></div>
    <div class="mt:20 {flex:1;mt:0}@sm">
      <div class="flex ai:flex-start gap-x:20 mb:auto">
        <button
          class="group rel flex center-content w:80 h:80 bg:primary rounded @backgroundGradient|2s|linear|infinite:hover@md"
          type="button"
          @click="createSong(song)"
        >
          <div
            class="abs inset:0 rounded opacity:0 @backgroundGradient|2s|linear|infinite ~opacity|.3s .group:hover_{opacity:1}@md"
          ></div>
          <div class="rel">
            <IconPause
              v-if="song.uuid === currentSong.uuid && isSoundPlaying"
              :width="28"
              :height="28"
            />
            <IconPlay v-else :width="28" :height="28" />
          </div>
        </button>
        <h1 class="mt:24 flex:1 f:bold f:24 fg:white {mt:20;f:28}@md">
          {{ song.title }}
        </h1>
      </div>
      <div
        class="rel grid-cols:3 py:40 mt:30 t:center r:20 mt:40@md {content:'';abs;top:1/2;left:0;w:3;h:30;bg:#777;translateY(-50%)}>div~div::before"
      >
        <div class="rel">
          <span class="f:12 fg:#999 f:16@md">曲風</span>
          <h3 class="mt:4 f:bold fg:white f:24@md">{{ song.genre }}</h3>
        </div>
        <div class="rel">
          <span class="f:12 fg:#999 f:16@md">上傳者</span>
          <h3 class="mt:4 f:bold fg:white f:24@md">
            {{ song.displayName }}
          </h3>
        </div>
        <div class="rel">
          <span class="f:12 fg:#999 f:16@md">上傳時間</span>
          <h3 class="mt:4 f:bold fg:white f:24@md">
            {{ formattedCreatedAt }}
          </h3>
        </div>
      </div>
    </div>
  </div>
</template>
