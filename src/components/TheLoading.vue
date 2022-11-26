<script setup>
import { ref } from 'vue';
import IconTransitionArrow from '@/components/icons/IconTransitionArrow.vue';

const loadingRef = ref(null);
const loadingBackgroundRef = ref(null);
const loadingArrowRef = ref(null);
const loadingSlashRef = ref(null);

defineExpose({
  loadingRef,
  loadingBackgroundRef,
  loadingArrowRef,
  loadingSlashRef,
});
</script>

<template>
  <div ref="loadingRef" class="fixed inset:0 z:1002">
    <div ref="loadingBackgroundRef" class="abs inset:0 bg:#0f0f0f"></div>
    <div ref="loadingArrowRef" class="abs top:0 left:0 w:200% h:full">
      <div class="abs top:0 right:0 w:3/4 h:full bg:#0f0f0f"></div>
      <div class="abs top:0 left:0 w:1/2 h:full {abs;top:0;w:60%;h:full}>div">
        <div class="right:0">
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
    <div
      ref="loadingSlashRef"
      class="abs inset:0 bg:repeating-linear-gradient(40deg,#0f0f0f,#0f0f0f|3px,transparent|3px,transparent|8px)"
    ></div>
  </div>
</template>
