<script setup>
import { RouterLink } from 'vue-router';

defineProps({
  song: {
    type: Object,
    required: true,
  },
});
</script>

<template>
  <div class="grid-col-span:4@xs">
    <RouterLink
      class="rel flex jc:space-between ai:center h:80 pl:30 pr:10 bg:black rounded"
      :to="{
        name: 'song',
        params: {
          id: song.docID,
        },
      }"
    >
      <div class="flex:1 lines:1">
        <h3 class="f:bold fg:white f:18@md" :title="song.modifiedName">
          {{ song.modifiedName }}
        </h3>
      </div>
      <div class="block w:140 h:60 bg:#333 rounded"></div>
    </RouterLink>
  </div>
</template>
