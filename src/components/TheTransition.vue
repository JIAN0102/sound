<script setup>
import { ref } from 'vue';
import IconTransitionArrow from '@/components/icons/IconTransitionArrow.vue';

const transitionRef = ref(null);
const transitionBackgroundRef = ref(null);
const transitionArrowRef = ref(null);

defineExpose({
  transitionRef,
  transitionBackgroundRef,
  transitionArrowRef,
});
</script>

<template>
  <div ref="transitionRef" class="fixed inset:0 z:1001 opacity:0 invisible">
    <div ref="transitionBackgroundRef" class="abs inset:0 bg:#030303"></div>
    <div ref="transitionArrowRef" class="abs top:0 left:0 w:300% h:full">
      <div
        class="abs top:0 left:1/2 w:2/3 h:full bg:#030303 translateX(-50%)"
      ></div>
      <div class="abs top:0 right:0 w:1/3 h:full {abs;top:0;w:60%;h:full}>div">
        <div class="right:0">
          <IconTransitionArrow
            :width="'100%'"
            :height="'100%'"
            :color="'#565656'"
          />
        </div>
        <div class="left:0">
          <IconTransitionArrow
            :width="'100%'"
            :height="'100%'"
            :color="'#232323'"
          />
        </div>
      </div>
      <div class="abs top:0 left:0 w:1/3 h:full {abs;top:0;w:60%;h:full}>div">
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
      <div
        class="abs inset:0 bg:repeating-linear-gradient(40deg,#030303,#030303|3px,transparent|3px,transparent|8px)"
      ></div>
    </div>
  </div>
</template>
