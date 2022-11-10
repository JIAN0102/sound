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
    <div
      class="rel flex jc:space-between ai:center h:80 pl:30 pr:10 bg:black rounded"
    >
      <RouterLink class="flex:1 lines:1" :to="{ name: 'song' }">
        <h3 class="f:bold fg:white f:18@md" :title="song.modifiedName">
          {{ song.modifiedName }}
        </h3>
      </RouterLink>
      <RouterLink
        class="block w:140 h:60 bg:#333 rounded"
        :to="{ name: 'song' }"
      ></RouterLink>
    </div>
  </div>
</template>
