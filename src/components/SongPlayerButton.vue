<script setup>
import { storeToRefs } from 'pinia';
import { usePlayerStore } from '@/stores/player';
import IconPlay from '@/components/icons/IconPlay.vue';
import IconPause from '@/components/icons/IconPause.vue';

const playerStore = usePlayerStore();
const { isSoundPlaying } = storeToRefs(playerStore);
const { toggleAudio } = playerStore;
</script>

<template>
  <button
    class="flex center-content w:80 h:60 bg:linear-gradient(to|right,primary,secondary) w:120@md"
    type="button"
    @click.prevent="toggleAudio"
  >
    <div class="translate(4,3)">
      <IconPause v-if="isSoundPlaying" />
      <IconPlay v-else />
    </div>
  </button>
</template>
