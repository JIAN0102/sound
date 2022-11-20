<script setup>
import { ref, watch, onMounted } from 'vue';
import { storeToRefs } from 'pinia';
import gsap from 'gsap';
import { usePlayerStore } from '@/stores/player';

const playerStore = usePlayerStore();
const { isSoundPlaying } = storeToRefs(playerStore);

const character = ref(null);
const rotateCDAnime = ref(null);

watch(
  () => isSoundPlaying.value,
  (newVal) => {
    if (newVal) {
      rotateCDAnime.value.play();
      gsap.to(rotateCDAnime.value, {
        timeScale: 1,
        duration: 3,
      });
    } else {
      gsap.to(rotateCDAnime.value, {
        timeScale: 0,
        duration: 3,
      });
    }
  }
);

onMounted(() => {
  rotateCDAnime.value = gsap
    .to(character.value, {
      rotation: 360,
      duration: 0.75,
      ease: 'none',
      repeat: -1,
    })
    .timeScale(0);
});
</script>

<template>
  <div class="fixed inset:0 overflow:hidden pointer-events:none">
    <div
      class="abs inset:0 bg:repeating-linear-gradient(40deg,#262626,#262626|3px,#161616|3px,#161616|8px)"
    ></div>

    <div
      class="abs top:1/2 left:1/2 w:150% opacity:.04 translate(-50%,-50%)|rotate(-12.5) {h:30vh;bg:url('/assets/img/sound-text.svg');background-size:auto|100%}>div @scroll|25s|linear|infinite>div:odd @scroll|25s|linear|infinite|reverse>div:even"
    >
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>

    <div
      class="abs top:15% bottom:-15% left:1/2 translateX(-50%) bottom:-40%@xs bottom:-60%@md"
    >
      <img
        ref="character"
        class="h:full"
        src="/assets/img/cd-character.png"
        alt="Character"
      />
    </div>
  </div>
</template>
