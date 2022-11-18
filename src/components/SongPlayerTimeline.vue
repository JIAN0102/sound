<script setup>
import { ref } from 'vue';
import { storeToRefs } from 'pinia';
import { usePlayerStore } from '@/stores/player';
import { formatTime } from '@/helpers';

const playerStore = usePlayerStore();
const { dragging, currentSong, seek, duration, progress, isSoundLoaded } =
  storeToRefs(playerStore);
const { pauseAudio, updateSeek } = playerStore;

const slider = ref(null);

function onSliderDown(event) {
  if (!isSoundLoaded.value) return;

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

  pauseAudio();

  const clientX = getClientX(event);
  const sliderSize = slider.value?.clientWidth;
  const sliderOffsetLeft = slider.value?.getBoundingClientRect().left;
  const newPercent = (clientX - sliderOffsetLeft) / sliderSize;

  seek.value = duration.value * newPercent;
  progress.value = newPercent;
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

    seek.value = duration.value * newPercent;
    progress.value = newPercent;
  }
}

function onDragEnd() {
  if (dragging.value) {
    dragging.value = false;

    updateSeek(progress.value);

    window.removeEventListener('mousemove', onDragging);
    window.removeEventListener('touchmove', onDragging);
  }
}
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
      :style="{ width: `${progress * 100}%` }"
    ></div>
    <div
      class="rel flex jc:space-between ai:center gap-x:30 h:full pointer-events:none"
    >
      <span class="hide@<md">{{ formatTime(seek) }}</span>
      <div class="flex:1 t:center">
        <h2 v-if="currentSong.modifiedName">
          {{ currentSong.modifiedName }}
        </h2>
        <h2 v-else>尚無播放的曲目</h2>
      </div>
      <span class="hide@<md">{{ formatTime(duration) }}</span>
    </div>
  </div>
</template>
