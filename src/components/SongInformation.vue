<script setup>
import { ref, computed, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { storeToRefs } from 'pinia';
import { usePlayerStore } from '@/stores/player';
import { doc, getDoc } from 'firebase/firestore';
import { songsCollection } from '@/plugins/firebase';
import { formatDistanceToNow } from 'date-fns';
import { zhTW } from 'date-fns/locale';
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
  try {
    const snapshot = await getDoc(doc(songsCollection, route.params.id));
    if (!snapshot.exists()) {
      router.push({
        name: 'home',
      });
      return;
    }
    song.value = {
      ...snapshot.data(),
      docID: snapshot.id,
    };
  } catch (error) {
    console.log(error);
  }
});
</script>

<template>
  <div
    class="rel overflow:hidden bg:#212121 r:12"
    :class="`bg:url('${song.coverUrl}')|center/cover`"
  >
    <div class="abs inset:0 bd:blur(50)|brightness(50%)"></div>
    <div
      class="rel square mx:auto overflow:hidden bg:linear-gradient(145deg,#383838,#767676) max-w:400@xs"
    >
      <img
        v-if="song.coverUrl"
        class="abs top:0 left:0 full obj:cover"
        :src="song.coverUrl"
        :alt="song.title"
      />
    </div>
  </div>
  <div class="flex gap-x:20 mt:30">
    <div class="flex:1 mt:6 mt:0@md">
      <h1 class="f:bold f:24 fg:white f:32@sm f:40@md">
        {{ song.title }}
      </h1>
      <h2 class="mt:4 f:14 fg:white/.5">
        {{ song.displayName }} • {{ song.genre }} •
        {{ formattedCreatedAt }}
      </h2>
    </div>
    <button
      class="group rel flex center-content w:64 h:64 bg:primary rounded @background-gradient|2s|linear|infinite:hover@md"
      type="button"
      @click="createSong(song)"
    >
      <div
        class="abs inset:0 rounded opacity:0 @background-gradient|2s|linear|infinite ~opacity|.3s .group:hover_{opacity:1}@md"
      ></div>
      <div class="rel">
        <IconPause
          v-if="song.docID === currentSong.docID && isSoundPlaying"
          :width="24"
          :height="24"
        />
        <IconPlay v-else :width="24" :height="24" />
      </div>
    </button>
  </div>
  <p
    v-if="song.description"
    class="mt:20 fg:white/.7 lh:1.75 white-space:pre-wrap"
  >
    {{ song.description }}
  </p>
  <ul v-if="song.tags?.length" class="flex flex:wrap gap:8 mt:20">
    <li v-for="tag in song.tags" :key="tag">
      <div
        class="rel flex ai:center gap-x:3 h:30 pr:10 pl:20 f:14 fg:white bg:#212121 rounded {content:'#';abs;top:8;left:8;fg:white/.5}::before"
      >
        <span class="max-w:120 lines:1">{{ tag }}</span>
      </div>
    </li>
  </ul>
</template>
