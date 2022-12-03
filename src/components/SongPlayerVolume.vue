<script setup>
import { ref } from 'vue';
import { storeToRefs } from 'pinia';
import { usePlayerStore } from '@/stores/player';
import IconVolume from '@/components/icons/IconVolume.vue';
import IconMuted from '@/components/icons/IconMuted.vue';

const playerStore = usePlayerStore();
const { volume } = storeToRefs(playerStore);
const { updateVolume } = playerStore;

const dragging = ref(false);
const slider = ref(null);

function onSliderDown(event) {
  event.preventDefault();

  onDragStart(event);

  window.addEventListener('mousemove', onDragging);
  window.addEventListener('touchmove', onDragging);
  window.addEventListener('mouseup', onDragEnd);
  window.addEventListener('touchend', onDragEnd);
}

function getClientX(event) {
  let clientX;

  if (event.type.startsWith('touch')) {
    clientX = event.touches[0].clientX;
  } else {
    clientX = event.clientX;
  }

  return clientX;
}

function onDragStart(event) {
  dragging.value = true;

  const clientX = getClientX(event);
  const sliderSize = slider.value?.clientWidth;
  const sliderOffsetLeft = slider.value?.getBoundingClientRect().left;
  const newPercent = (clientX - sliderOffsetLeft) / sliderSize;

  updateVolume(newPercent);
}

function onDragging(event) {
  if (dragging.value) {
    const clientX = getClientX(event);
    const sliderSize = slider.value?.clientWidth;
    const sliderOffsetLeft = slider.value?.getBoundingClientRect().left;
    let newPercent = (clientX - sliderOffsetLeft) / sliderSize;

    if (newPercent < 0) {
      newPercent = 0;
    } else if (newPercent > 1) {
      newPercent = 1;
    }

    updateVolume(newPercent);
  }
}

function onDragEnd() {
  if (dragging.value) {
    dragging.value = false;

    window.removeEventListener('mousemove', onDragging);
    window.removeEventListener('touchmove', onDragging);
  }
}
</script>

<template>
  <div
    ref="slider"
    class="rel w:120 h:60 overflow:hidden cursor:pointer hide@<md"
    @mousedown.left="onSliderDown"
    @touchstart="onSliderDown"
  >
    <div
      class="abs top:0 left:0 h:full bg:#393939 transform:left"
      :style="{ width: `${volume * 100}%` }"
    ></div>
    <div class="abs top:1/2 left:20 fg:white translateY(-50%)">
      <IconMuted v-if="volume === 0" />
      <IconVolume v-else />
    </div>
  </div>
</template>
