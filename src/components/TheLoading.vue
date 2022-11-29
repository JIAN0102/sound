<script setup>
import { ref } from 'vue';

const loadingRef = ref(null);
const loadingWaveRef = ref(null);
const loadingLogoRef = ref(null);

defineExpose({
  loadingRef,
  loadingWaveRef,
  loadingLogoRef,
});
</script>

<template>
  <div
    ref="loadingRef"
    class="fixed inset:0 z:1002 flex center-content overflow:hidden"
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      class="abs top:0 left:0 full"
      viewBox="0 0 100 100"
      fill="black"
      preserveAspectRatio="none"
    >
      <path ref="loadingWaveRef" d="M 0 100 V 100 Q 50 100 100 100 V 100 z" />
    </svg>
    <div ref="loadingLogoRef" class="rel">
      <img src="/assets/img/sound-logo.svg" alt="sound" />
    </div>
  </div>
</template>
