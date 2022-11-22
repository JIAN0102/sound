<script setup>
import { ref, onMounted } from 'vue';
import { storeToRefs } from 'pinia';
import { useSongStore } from '@/stores/song';
import IconLoading from '@/components/icons/IconLoading.vue';
import SongModifyItem from '@/components/SongModifyItem.vue';

const songStore = useSongStore();
const { songs } = storeToRefs(songStore);
const { getSongs } = songStore;

const isPending = ref(false);

onMounted(() => {
  isPending.value = true;
  setTimeout(async () => {
    await getSongs();
    isPending.value = false;
  }, 500);
});
</script>

<template>
  <div v-if="isPending" class="flex jc:center fg:white">
    <IconLoading />
  </div>
  <div v-else>
    <Transition name="slide" mode="out-in">
      <div v-if="!songs.length" class="fg:white t:center">
        目前沒有任何歌曲，嘗試上傳看看吧!
      </div>
      <ul v-else class="mt:20>li~li">
        <TransitionGroup name="slide">
          <SongModifyItem
            v-for="song in songs"
            :key="song.docID"
            :song="song"
          />
        </TransitionGroup>
      </ul>
    </Transition>
  </div>
</template>
