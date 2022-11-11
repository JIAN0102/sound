<script setup>
import { onMounted } from 'vue';
import { storeToRefs } from 'pinia';
import { useSongStore } from '@/stores/song';
import SongModifyItem from '@/components/SongModifyItem.vue';

const songStore = useSongStore();
const { songs } = storeToRefs(songStore);
const { getSongs } = songStore;

onMounted(() => {
  getSongs();
});
</script>

<template>
  <ul class="mt:20>li~li">
    <SongModifyItem v-for="song in songs" :key="song.docID" :song="song" />
  </ul>
</template>
