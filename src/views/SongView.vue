<script setup>
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { doc, getDoc } from 'firebase/firestore';
import { songsCollection } from '@/plugins/firebase';
import BaseCard from '@/components/BaseCard.vue';
import SongInformation from '@/components/SongInformation.vue';
import CommentPost from '@/components/CommentPost.vue';

const route = useRoute();
const router = useRouter();

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
          <SongInformation :song="song" />
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
          <CommentPost />
        </template>
      </BaseCard>
    </div>
  </div>
</template>
