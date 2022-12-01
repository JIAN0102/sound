<script setup>
import { ref, watch, onMounted } from 'vue';
import { storeToRefs } from 'pinia';
import { usePlayerStore } from '@/stores/player';
import gsap from 'gsap';

const playerStore = usePlayerStore();
const { isSoundPlaying } = storeToRefs(playerStore);

const characterRef = ref(null);
const rotateCDAnime = ref(null);

watch(isSoundPlaying, (newVal) => {
  if (newVal) {
    rotateCDAnime.value.play();
    gsap.to(rotateCDAnime.value, {
      timeScale: 1,
      duration: 2,
    });
  } else {
    gsap.to(rotateCDAnime.value, {
      timeScale: 0,
      duration: 2,
    });
  }
});

onMounted(() => {
  rotateCDAnime.value = gsap
    .to(characterRef.value, {
      rotation: 360,
      duration: 0.75,
      ease: 'none',
      repeat: -1,
    })
    .timeScale(0);
});

defineExpose({
  characterRef,
});
</script>

<template>
  <div class="fixed inset:0 overflow:hidden pointer-events:none">
    <div
      class="abs inset:0 bg:repeating-linear-gradient(40deg,#262626,#262626|3px,#161616|3px,#161616|8px)"
    ></div>
    <div
      class="abs top:1/2 left:1/2 w:120% translate(-50%,-50%)|rotate(-12.5) {h:20vh;bg:url('/assets/img/sound-text-fill.svg');background-size:auto|100%}>div {opacity:.05;@scroll|40s|linear|infinite}>div:odd {opacity:.025;@scroll|40s|linear|infinite|reverse}>div:even"
    >
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
    <div
      class="abs top:20% bottom:-20% left:1/2 translateX(-50%) {top:15%;bottom:-40%@xs} bottom:-60%@md"
    >
      <img
        ref="characterRef"
        class="h:full"
        src="/assets/img/cd-character.png"
        alt="Character"
      />
    </div>
  </div>
</template>
