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
  <transition name="loading" mode="out-in" :duration="1000">
    <div v-if="show" class="fixed inset:0 z:999 flex center-content">
      <div
        class="abs inset:0 bg:black translateX(0) :is(.loading-enter-active,.loading-leave-active)_{transition:all|1s} .loading-enter-from_{translateX(-100%)} .loading-leave-to_{translateX(100%)}"
      ></div>
      <div
        class="abs inset:0 bg:black translateX(100%) :is(.loading-enter-active,.loading-leave-active)_{transition:all|1s} .loading-enter-from_{translateX(-100%)} {abs;top:0;w:50%;h:full}>svg"
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
        class="abs inset:0 bg:black translateX(-100%) :is(.loading-enter-active,.loading-leave-active)_{transition:all|1s} .loading-leave-to_{translateX(100%)} {abs;top:0;w:50%;h:full}>svg"
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
  </transition>
</template>
