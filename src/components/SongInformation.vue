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
  <div class="{flex;ai:flex-start;gap-x:40}@sm">
    <img
      class="square w:full obj:cover bg:#555 r:30 w:30%@sm w:40%@md"
      :src="song.coverUrl"
      :alt="song.title"
    />
    <div class="mt:20 {flex:1;mt:0}@sm">
      <div class="flex ai:flex-start gap-x:20 mb:auto flex:row-reverse@sm">
        <h1 class="mt:24 flex:1 f:bold f:24 fg:white {mt:20;f:28}@md">
          {{ song.title }}
        </h1>
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
      </div>
      <p class="mt:20 fg:white lh:1.75 white-space:pre-wrap">
        {{ song.description }}
      </p>
      <ul class="flex flex:wrap gap:8 mt:20">
        <li v-for="tag in song.tags" :key="tag">
          <span
            class="rel block p:6|8|6|20 f:14 fg:white bg:#555 rounded {content:'#';abs;top:8;left:8;fg:white/.5}::before"
          >
            {{ tag }}
          </span>
        </li>
      </ul>
      <div class="rel grid-cols:3 mt:30 r:20 mt:40@md">
        <div class="">
          <span class="f:12 fg:#999 f:14@md">曲風</span>
          <h3 class="mt:4 f:bold fg:white f:20@md">{{ song.genre }}</h3>
        </div>
        <div class="">
          <span class="f:12 fg:#999 f:14@md">上傳者</span>
          <h3 class="mt:4 f:bold fg:white f:20@md">
            {{ song.displayName }}
          </h3>
        </div>
        <div class="">
          <span class="f:12 fg:#999 f:14@md">上傳時間</span>
          <h3 class="mt:4 f:bold fg:white f:20@md">
            {{ formattedCreatedAt }}
          </h3>
        </div>
      </div>
    </div>
  </div>
</template>
