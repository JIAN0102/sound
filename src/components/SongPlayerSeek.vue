<script setup>
import { storeToRefs } from 'pinia';
import { usePlayerStore } from '@/stores/player';
import { useSlider } from '@/composables/useSlider';

const playerStore = usePlayerStore();
const { currentSong, seek, duration, progress } = storeToRefs(playerStore);

const emit = defineEmits(['on-drag-start', 'update-position', 'on-drag-end']);
const { slider, onSliderDown } = useSlider(emit);
</script>

<template>
  <div
    ref="slider"
    class="rel flex:1 h:60 px:30 f:bold fg:white cursor:pointer"
    @mousedown="onSliderDown"
    @touchstart="onSliderDown"
  >
    <div
      class="abs top:0 left:0 h:full bg:#333 bg:url('/assets/img/progress-arrow.svg') @progress|1s|linear|infinite"
      :style="{ width: `${progress}%` }"
    ></div>
    <div class="rel flex jc:space-between ai:center h:full pointer-events:none">
      <span class="hide@<md">{{ seek }}</span>
      <h2>
        {{ currentSong.modifiedName }}
      </h2>
      <span class="hide@<md">{{ duration }}</span>
    </div>
  </div>
</template>
