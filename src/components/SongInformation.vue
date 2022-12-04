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
  <div class="grid-cols:1 gap:20|40 grid-cols:5@sm">
    <div class="grid-col-span:2@sm">
      <div
        class="rel square overflow:hidden cursor:pointer bg:linear-gradient(135deg,#393939,#787878) r:10"
      >
        <img
          v-if="song.coverUrl"
          class="abs top:0 left:0 full obj:cover"
          :src="song.coverUrl"
          :alt="song.title"
        />
        <div
          class="abs inset:0 bg:linear-gradient(to|bottom,black/.5,transparent) opacity:0 invisible ~opacity|.3s,visibility|.3s .is-active_{opacity:1;visible} .group:hover_{opacity:1;visible}"
        ></div>
      </div>
    </div>
    <div class="grid-col-span:3@sm">
      <div class="flex ai:flex-start gap-x:20 flex:row-reverse@sm">
        <div class="flex:1 mt:6">
          <h1 class="f:bold f:20 fg:white f:24@sm f:28@md">
            {{ song.title }}
          </h1>
          <h2 class="mt:4 f:14 fg:#919191">
            {{ song.displayName }} • {{ song.genre }} • {{ formattedCreatedAt }}
          </h2>
        </div>
        <button
          class="group rel flex center-content w:64 h:64 bg:primary rounded @backgroundGradient|2s|linear|infinite:hover@md"
          type="button"
          @click="createSong(song)"
        >
          <div
            class="abs inset:0 rounded opacity:0 @backgroundGradient|2s|linear|infinite ~opacity|.3s .group:hover_{opacity:1}@md"
          ></div>
          <div class="rel">
            <IconPause
              v-if="song.uuid === currentSong.uuid && isSoundPlaying"
            />
            <IconPlay v-else />
          </div>
        </button>
      </div>
      <p class="mt:20 fg:white lh:1.75 white-space:pre-wrap">
        {{ song.description }}
      </p>
      <ul class="flex flex:wrap gap:8 mt:20">
        <li v-for="tag in song.tags" :key="tag">
          <div
            class="rel flex ai:center gap-x:3 h:30 pr:10 pl:20 f:14 fg:white bg:#393939 rounded {content:'#';abs;top:8;left:8;fg:#919191}::before"
          >
            <span class="max-w:120 lines:1">{{ tag }}</span>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>
