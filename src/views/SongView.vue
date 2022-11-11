<script setup>
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { doc, getDoc } from 'firebase/firestore';
import { songsCollection } from '@/plugins/firebase';
import { usePlayerStore } from '@/stores/player';
import BaseCard from '@/components/BaseCard.vue';
import CommentList from '@/components/CommentList.vue';

const route = useRoute();
const router = useRouter();

const playerStore = usePlayerStore();
const { setSong } = playerStore;

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
  <div class="grid-cols:1 gap:30|40 p:100|0|210 p:180|80|210@md grid-cols:2@lg">
    <div>
      <BaseCard>
        <template #header>
          <h1 class="f:bold f:24 fg:white t:center f:28@md">
            {{ song.modifiedName }}
          </h1>
        </template>

        <template #main>
          <div
            class="rel grid-cols:2 t:center {content:'';abs;top:1/2;left:0;w:3;h:30;bg:#777;translateY(-50%)}>div~div::before"
          >
            <div class="rel">
              <span class="f:12 fg:#777 f:16@md">上傳者</span>
              <h3 class="mt:4 f:bold fg:white f:24@md">
                {{ song.displayName }}
              </h3>
            </div>
            <div class="rel">
              <span class="f:12 fg:#777 f:16@md">曲風</span>
              <h3 class="mt:4 f:bold fg:white f:24@md">{{ song.genre }}</h3>
            </div>
          </div>
          <button
            class="group rel w:full mt:20 mt:30@md"
            type="button"
            @click.prevent="setSong(song)"
          >
            <div
              class="abs top:1/2 left:1/2 full bg:linear-gradient(to|right,primary,secondary) rounded translate(-50%,-50%) .group:hover_{animation:bounce|1s|infinite}"
            ></div>
            <div class="rel flex center-content h:60">
              <span
                class="abs top:1/2 left:14 w:32 h:32 bg:black rounded translateY(-50%)"
              ></span>
              <span class="f:bold f:18">播放音樂</span>
            </div>
          </button>
        </template>
      </BaseCard>
    </div>

    <div>
      <BaseCard>
        <template #header>
          <h2 class="f:bold f:24 fg:white t:center {f:28;t:left}@md">
            發表留言
          </h2>
        </template>

        <template #main>
          <CommentList />
        </template>
      </BaseCard>
    </div>
  </div>
</template>
