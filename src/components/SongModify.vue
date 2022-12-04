<script setup>
import { ref, onMounted } from 'vue';
import { storeToRefs } from 'pinia';
import { useSongStore } from '@/stores/song';
import IconLoading from '@/components/icons/IconLoading.vue';
import SongModifyPreview from '@/components/SongModifyPreview.vue';

const songStore = useSongStore();
const { songs } = storeToRefs(songStore);
const { getSongs } = songStore;

const isPending = ref(false);

onMounted(async () => {
  isPending.value = true;
  await getSongs();
  isPending.value = false;
});
</script>

<template>
  <div v-if="isPending" class="flex jc:center fg:white">
    <IconLoading />
  </div>

  <template v-else>
    <Transition name="slide" mode="out-in">
      <h3 v-if="!songs.length" class="fg:white t:center">
        目前沒有任何歌曲，試著上傳看看吧!
      </h3>
      <ul v-else class="mt:20>li~li">
        <TransitionGroup name="slide">
          <li v-for="song in songs" :key="song.docID">
            <SongModifyPreview :song="song" />
          </li>
        </TransitionGroup>
      </ul>
    </Transition>
  </template>
</template>
