<script setup>
import { ref } from 'vue';

const transitionRef = ref(null);
const transitionOverlayRef = ref(null);
const transitionArrowFrontRef = ref(null);
const transitionArrowBackRef = ref(null);

defineExpose({
  transitionRef,
  transitionOverlayRef,
  transitionArrowFrontRef,
  transitionArrowBackRef,
});
</script>

<template>
  <div ref="transitionRef" class="fixed inset:0 z:1001 opacity:0 invisible">
    <div ref="transitionOverlayRef" class="abs inset:0 bg:black"></div>
    <div
      ref="transitionArrowFrontRef"
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
          fill="#565656"
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
          fill="#0f0f0f"
        />
      </svg>
    </div>
    <div
      ref="transitionArrowBackRef"
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
