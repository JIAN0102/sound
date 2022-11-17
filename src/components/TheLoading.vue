<script setup>
import { ref, watch } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();
const show = ref(true);

watch(
  () => route.name,
  () => {
    show.value = true;
    setTimeout(() => {
      show.value = false;
    }, 1500);
  }
);
</script>

<template>
  <transition name="nested" mode="out-in">
    <div
      v-show="show"
      class="fixed inset:0 z:999 flex center-content pointer-events:none"
    >
      <div
        class="abs inset:0 bg:black translateX(0) :is(.nested-enter-active,.nested-leave-active)_{~all|.5s} .nested-enter-from_{translateX(-100%)} .nested-leave-to_{translateX(100%)}"
      ></div>
      <div
        class="abs inset:0 bg:black translateX(100%) :is(.nested-enter-active,.nested-leave-active)_{transition:all|1s} .nested-enter-from_{translateX(-100%)}"
      >
        <svg
          class="abs top:0 right:0 w:auto h:full"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1080 1080"
        >
          <polygon
            points="900,0 0,0 180,540 0,1080 900,1080 1080,540"
            fill="#565656"
          />
        </svg>
        <svg
          class="abs top:0 left:1/2 w:auto h:full translateX(-50%)"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1080 1080"
        >
          <polygon
            points="900,0 0,0 180,540 0,1080 900,1080 1080,540"
            fill="#232323"
          />
        </svg>
        <svg
          class="abs top:0 left:0 w:auto h:full"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1080 1080"
        >
          <polygon
            points="900,0 0,0 180,540 0,1080 900,1080 1080,540"
            fill="#0f0f0f"
          />
        </svg>
      </div>
      <div
        class="abs inset:0 bg:black translateX(-100%) :is(.nested-enter-active,.nested-leave-active)_{transition:all|1s} .nested-leave-to_{translateX(100%)}"
      >
        <svg
          class="abs top:0 right:0 w:auto h:full"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1080 1080"
        >
          <polygon
            points="900,0 0,0 180,540 0,1080 900,1080 1080,540"
            fill="#0f0f0f"
          />
        </svg>
        <svg
          class="abs top:0 left:1/2 w:auto h:full translateX(-50%)"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1080 1080"
        >
          <polygon
            points="900,0 0,0 180,540 0,1080 900,1080 1080,540"
            fill="#232323"
          />
        </svg>
        <svg
          class="abs top:0 left:0 w:auto h:full"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1080 1080"
        >
          <polygon
            points="900,0 0,0 180,540 0,1080 900,1080 1080,540"
            fill="#565656"
          />
        </svg>
      </div>
    </div>
  </transition>
</template>
