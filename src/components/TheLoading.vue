<script setup>
import { ref } from 'vue';

const loadingRef = ref(null);
const loadingBackgroundRef = ref(null);
const loadingLogoRef = ref(null);

defineExpose({
  loadingRef,
  loadingBackgroundRef,
  loadingLogoRef,
});
</script>

<template>
  <div ref="loadingRef" class="fixed inset:0 z:1002 overflow:hidden bg:black">
    <div ref="loadingBackgroundRef" class="abs inset:0 flex center-content">
      <div ref="loadingLogoRef">
        <img src="/assets/img/sound-logo.svg" alt="sound" />
      </div>
    </div>
  </div>
</template>
