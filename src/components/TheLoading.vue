<script setup>
import { ref } from 'vue';
import IconTransitionArrow from '@/components/icons/IconTransitionArrow.vue';

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
  <div ref="loadingRef" class="hide! fixed inset:0 z:1002">
    <div ref="loadingOverlayRef" class="abs inset:0 bg:black"></div>
    <div
      ref="loadingArrowRef"
      class="abs inset:0 bg:black {abs;top:0;w:50%;h:full}>div"
    >
      <div class="right:0">
        <IconTransitionArrow
          :width="'100%'"
          :height="'100%'"
          :color="'#0f0f0f'"
        />
      </div>
      <div class="left:1/2 translateX(-50%)">
        <IconTransitionArrow
          :width="'100%'"
          :height="'100%'"
          :color="'#232323'"
        />
      </div>
      <div class="left:0">
        <IconTransitionArrow
          :width="'100%'"
          :height="'100%'"
          :color="'#565656'"
        />
      </div>
    </div>
  </div>
</template>
