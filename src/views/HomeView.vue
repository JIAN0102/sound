<script setup>
import { ref, reactive, onMounted } from 'vue';
import { RouterLink } from 'vue-router';
import { songsCollection } from '@/plugins/firebase';
import { query, orderBy, limit, getDocs } from 'firebase/firestore';

const songs = reactive([]);
const maxPerPage = ref(10);

async function getSongs() {
  const q = query(
    songsCollection,
    orderBy('modifiedName'),
    limit(maxPerPage.value)
  );
  const snapshots = await getDocs(q);

  snapshots.forEach((document) => {
    songs.push({
      ...document.data(),
      docID: document.id,
    });
  });

  console.log(snapshots);
}

onMounted(async () => {
  await getSongs();
});
</script>

<template>
  <div class="mt:100vh px:20 pb:210 px:80@md">
    <div
      class="grid-cols:1 gap:40 grid-cols:9@xs grid-cols:13@lg grid-col-start:2>div:nth(4n+3)@xs&<lg grid-col-start:2>div:nth(6n+4)@lg"
    >
      <div class="grid-col-span:4@xs">
        <RouterLink
          class="block h:80 bg:black rounded"
          :to="{ name: 'song' }"
        ></RouterLink>
      </div>
      <div class="grid-col-span:4@xs">
        <RouterLink
          class="block h:80 bg:black rounded"
          :to="{ name: 'song' }"
        ></RouterLink>
      </div>
      <div class="grid-col-span:4@xs">
        <RouterLink
          class="block h:80 bg:black rounded"
          :to="{ name: 'song' }"
        ></RouterLink>
      </div>
      <div class="grid-col-span:4@xs">
        <RouterLink
          class="block h:80 bg:black rounded"
          :to="{ name: 'song' }"
        ></RouterLink>
      </div>
    </div>
  </div>
</template>
