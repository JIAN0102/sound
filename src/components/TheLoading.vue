<script setup>
import { ref } from 'vue';

const loadingRef = ref(null);
const loadingOverlayRef = ref(null);
const loadingArrowRef = ref(null);

defineExpose({
  loadingRef,
  loadingOverlayRef,
  loadingArrowRef,
});
</script>

<template>
  <div ref="loadingRef" class="fixed inset:0 z:1002">
    <div ref="loadingOverlayRef" class="abs inset:0 bg:black"></div>
    <div
      ref="loadingArrowRef"
      class="abs inset:0 bg:black {abs;top:0;w:50%;h:full}>svg"
    >
      <svg
        class="right:0"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1080 1080"
        preserveAspectRatio="none"
      >
        <polygon
          points="900,0 0,0 180,540 0,1080 900,1080 1080,540"
          fill="#0f0f0f"
        />
      </svg>
      <svg
        class="left:1/2 translateX(-50%)"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1080 1080"
        preserveAspectRatio="none"
      >
        <polygon
          points="900,0 0,0 180,540 0,1080 900,1080 1080,540"
          fill="#232323"
        />
      </svg>
      <svg
        class="left:0"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1080 1080"
        preserveAspectRatio="none"
      >
        <polygon
          points="900,0 0,0 180,540 0,1080 900,1080 1080,540"
          fill="#565656"
        />
      </svg>
    </div>
  </div>
</template>
