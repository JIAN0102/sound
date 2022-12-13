<script setup>
import { ref, watch, onMounted } from 'vue';
import { storeToRefs } from 'pinia';
import { usePlayerStore } from '@/stores/player';
import { formatTime } from '@/helpers';
import { useSlider } from '@/composables/useSlider';
import gsap from 'gsap';

const playerStore = usePlayerStore();
const {
  currentSong,
  seek,
  duration,
  progress,
  isStopUpdateProgress,
  isSoundPlaying,
} = storeToRefs(playerStore);
const { pauseAudio, updateCacheProgress, updateSeek } = playerStore;

const { sliderRef, onSliderDown } = useSlider({
  onDragStartEvent,
  updatePercent: updateCacheProgress,
  onDragEndEvent,
});

function onDragStartEvent() {
  isStopUpdateProgress.value = true;
  pauseAudio();
}

function onDragEndEvent() {
  isStopUpdateProgress.value = false;
  updateSeek();
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
    ref="sliderRef"
    class="rel flex:1 h:60 cursor:pointer"
    @mousedown="onSliderDown"
    @touchstart="onSliderDown"
  >
    <div
      ref="progressRef"
      class="abs top:0 left:0 h:full bg:#383838 bg:url('/assets/img/progress-arrow.svg')"
      :style="{ width: `${progress * 100}%` }"
    ></div>
    <div
      class="rel flex jc:space-between ai:center gap-x:30 h:full px:30 f:bold fg:white pointer-events:none"
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
