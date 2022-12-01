<script setup>
import { ref, watch, onMounted } from 'vue';
import { storeToRefs } from 'pinia';
import gsap from 'gsap';
import { usePlayerStore } from '@/stores/player';
import { formatTime } from '@/helpers';

const playerStore = usePlayerStore();
const {
  dragging,
  currentSong,
  seek,
  duration,
  progress,
  isSoundLoaded,
  isSoundPlaying,
} = storeToRefs(playerStore);
const { pauseAudio, updateDraggingProgress, updateSeek } = playerStore;

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

  updateDraggingProgress(newPercent);
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

    updateDraggingProgress(newPercent);
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

const progressRef = ref(null);
const progressAnime = ref(null);

watch(isSoundPlaying, (newVal) => {
  if (newVal) {
    progressAnime.value.play();
    gsap.to(progressAnime.value, {
      timeScale: 1,
      duration: 1,
    });
  } else {
    gsap.to(progressAnime.value, {
      timeScale: 0,
      duration: 1,
    });
  }
});

onMounted(() => {
  progressAnime.value = gsap
    .to(progressRef.value, {
      backgroundPosition: '50px',
      duration: 1,
      ease: 'none',
      repeat: -1,
    })
    .timeScale(0);
});
</script>

<template>
  <div
    ref="slider"
    class="rel flex:1 h:60 px:30 cursor:pointer"
    @mousedown="onSliderDown"
    @touchstart="onSliderDown"
  >
    <div
      ref="progressRef"
      class="abs top:0 left:0 h:full bg:#555 bg:url('/assets/img/progress-arrow.svg')"
      :style="{ width: `${progress * 100}%` }"
    ></div>
    <div
      class="rel flex jc:space-between ai:center gap-x:30 h:full f:bold fg:white pointer-events:none"
    >
      <span class="hide@<md">{{ formatTime(seek) }}</span>
      <h2 class="flex:1 t:center lines:1">
        <template v-if="currentSong.title">{{ currentSong.title }}</template>
        <template v-else>尚無播放的曲目</template>
      </h2>
      <span class="hide@<md">{{ formatTime(duration) }}</span>
    </div>
  </div>
</template>
