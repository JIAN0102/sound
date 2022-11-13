<script setup>
import { ref } from 'vue';
import { storeToRefs } from 'pinia';
import { usePlayerStore } from '@/stores/player';

const playerStore = usePlayerStore();
const { currentSong, seek, duration, volume, progress, isSoundPlaying } =
  storeToRefs(playerStore);
const { playAudio, pauseAudio, toggleAudio, updateSeek, updateVolume } =
  playerStore;

const dragging = ref(false);
const slider = ref(null);

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
  pauseAudio();

  dragging.value = true;

  const clientX = getClientX(event);
  const sliderSize = slider.value.clientWidth;
  const sliderOffsetLeft = slider.value.getBoundingClientRect().left;
  const newPercent = (clientX - sliderOffsetLeft) / sliderSize;

  updateSeek(newPercent);
}

function onDragging(event) {
  if (dragging.value) {
    const clientX = getClientX(event);
    const sliderSize = slider.value.clientWidth;
    const sliderOffsetLeft = slider.value.getBoundingClientRect().left;
    let newPercent = (clientX - sliderOffsetLeft) / sliderSize;

    if (newPercent < 0) {
      newPercent = 0;
    } else if (newPercent > 1) {
      newPercent = 1;
    }

    updateSeek(newPercent);
  }
}

function onDragEnd() {
  if (dragging.value) {
    playAudio();

    dragging.value = false;

    window.removeEventListener('mousemove', onDragging);
    window.removeEventListener('touchmove', onDragging);
  }
}

function onSliderDown(event) {
  event.preventDefault();

  onDragStart(event);

  window.addEventListener('mousemove', onDragging);
  window.addEventListener('touchmove', onDragging);
  window.addEventListener('mouseup', onDragEnd);
  window.addEventListener('touchend', onDragEnd);
}
</script>

<template>
  <div
    class="fixed bottom:0 left:0 right:0 z:997 flex overflow:hidden bg:black b:1|solid|#333 bb:0 rt:40 {left:80;right:80;rt:60}@md"
  >
    <button
      class="w:80 h:60 bg:linear-gradient(to|right,primary,secondary) w:120@md"
      type="button"
      @click.prevent="toggleAudio"
    >
      <div v-show="!isSoundPlaying">播放</div>
      <div v-show="isSoundPlaying">暫停</div>
    </button>
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
      <div
        class="rel flex jc:space-between ai:center h:full pointer-events:none"
      >
        <span class="hide@<md">{{ seek }}</span>
        <h2>
          {{ currentSong.modifiedName }}
        </h2>
        <span class="hide@<md">{{ duration }}</span>
      </div>
    </div>
    <button
      class="rel w:120 h:60 overflow:hidden cursor:pointer hide@<md"
      type="button"
      @click.prevent="updateVolume"
    >
      <div
        class="abs top:0 left:0 h:full bg:#333 transform:left"
        :style="{ width: `${volume * 100}%` }"
      ></div>
      <div
        class="abs top:1/2 left:20 w:24 h:24 bg:white round translateY(-50%)"
      ></div>
    </button>
  </div>
</template>
