<script setup>
import { storeToRefs } from 'pinia';
import { usePlayerStore } from '@/stores/player';
import { useSlider } from '@/composables/useSlider';

const playerStore = usePlayerStore();
const { currentSong, seek, duration, progress } = storeToRefs(playerStore);

const emit = defineEmits(['drag-start', 'update', 'drag-end']);
const { slider, onSliderDown } = useSlider(emit);
</script>

<template>
  <div
    ref="slider"
    class="rel flex:1 h:60 px:30 f:bold fg:white cursor:pointer"
    @mousedown.left="onSliderDown"
    @touchstart="onSliderDown"
  >
    <div
      class="abs top:0 left:0 h:full bg:#333 bg:url('/assets/img/progress-arrow.svg') @progress|1s|linear|infinite"
      :style="{ width: `${progress}%` }"
    ></div>
    <div
      class="rel flex jc:space-between ai:center gap-x:30 h:full pointer-events:none"
    >
      <span class="hide@<md">{{ seek }}</span>
      <div class="flex:1 t:center lines:1">
        <h2 v-if="currentSong.modifiedName">
          {{ currentSong.modifiedName }}
        </h2>
        <h2 v-else>尚無播放的曲目</h2>
      </div>
      <span class="hide@<md">{{ duration }}</span>
    </div>
  </div>
</template>
