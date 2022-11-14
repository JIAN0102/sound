<script setup>
import { storeToRefs } from 'pinia';
import { usePlayerStore } from '@/stores/player';
import { useSlider } from '@/composables/useSlider';

const playerStore = usePlayerStore();
const { volume } = storeToRefs(playerStore);

const emit = defineEmits(['on-drag-start', 'update-position', 'on-drag-end']);
const { slider, onSliderDown } = useSlider(emit);
</script>

<template>
  <button
    ref="slider"
    class="rel w:120 h:60 overflow:hidden cursor:pointer hide@<md"
    type="button"
    @mousedown="onSliderDown"
    @touchstart="onSliderDown"
  >
    <div
      class="abs top:0 left:0 h:full bg:#333 transform:left"
      :style="{ width: `${volume * 100}%` }"
    ></div>
    <div
      class="abs top:1/2 left:20 w:24 h:24 bg:white round translateY(-50%)"
    ></div>
  </button>
</template>
