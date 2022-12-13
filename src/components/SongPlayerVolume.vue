<script setup>
import { storeToRefs } from 'pinia';
import { usePlayerStore } from '@/stores/player';
import { useSlider } from '@/composables/useSlider';
import IconVolume from '@/components/icons/IconVolume.vue';
import IconMuted from '@/components/icons/IconMuted.vue';

const playerStore = usePlayerStore();
const { volume } = storeToRefs(playerStore);
const { updateVolume } = playerStore;

const { sliderRef, onSliderDown } = useSlider({
  updatePercent: updateVolume,
});
</script>

<template>
  <div
    ref="sliderRef"
    class="rel w:120 h:60 overflow:hidden cursor:pointer hide@<md"
    @mousedown.left="onSliderDown"
    @touchstart="onSliderDown"
  >
    <div
      class="abs top:0 left:0 h:full bg:#383838 transform:left"
      :style="{ width: `${volume * 100}%` }"
    ></div>
    <div class="abs top:1/2 left:20 fg:white translateY(-50%)">
      <IconMuted v-if="volume === 0" />
      <IconVolume v-else />
    </div>
  </div>
</template>
