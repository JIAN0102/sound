<script setup>
import AppHeader from '@/components/AppHeader.vue';
import SongPlayer from '@/components/SongPlayer.vue';
import AuthModal from '@/components/AuthModal.vue';
</script>

<template>
  <div class="fixed inset:0">
    <div class="abs inset:0 bg:linear-gradient(#282828,black)"></div>
    <div
      class="abs inset:0 bg:repeating-linear-gradient(40deg,#19191e,#19191e|3px,transparent|3px,transparent|8px)"
    ></div>
    <div
      class="abs top:1/2 left:1/2 pointer-events:none translate(-50%,-50%)|rotate(-15deg) mt:-9vh>div~div"
    >
      <div
        class="flex font-family:countach f:bold f:50vh fg:white lh:1 white-space:nowrap opacity:.03"
      >
        <span class="px:40 @scroll|7.5s|linear|infinite">SOUND</span>
        <span class="px:40 @scroll|7.5s|linear|infinite">SOUND</span>
        <span class="px:40 @scroll|7.5s|linear|infinite">SOUND</span>
        <span class="px:40 @scroll|7.5s|linear|infinite">SOUND</span>
      </div>
      <div
        class="flex font-family:countach f:bold f:50vh fg:white lh:1 white-space:nowrap opacity:.03"
      >
        <span class="px:40 @scroll|7.5s|linear|infinite|reverse">SOUND</span>
        <span class="px:40 @scroll|7.5s|linear|infinite|reverse">SOUND</span>
        <span class="px:40 @scroll|7.5s|linear|infinite|reverse">SOUND</span>
        <span class="px:40 @scroll|7.5s|linear|infinite|reverse">SOUND</span>
      </div>
      <div
        class="flex font-family:countach f:bold f:50vh fg:white lh:1 white-space:nowrap opacity:.03"
      >
        <span class="px:40 @scroll|7.5s|linear|infinite">SOUND</span>
        <span class="px:40 @scroll|7.5s|linear|infinite">SOUND</span>
        <span class="px:40 @scroll|7.5s|linear|infinite">SOUND</span>
        <span class="px:40 @scroll|7.5s|linear|infinite">SOUND</span>
      </div>
      <div
        class="flex font-family:countach f:bold f:50vh fg:white lh:1 white-space:nowrap opacity:.03"
      >
        <span class="px:40 @scroll|7.5s|linear|infinite|reverse">SOUND</span>
        <span class="px:40 @scroll|7.5s|linear|infinite|reverse">SOUND</span>
        <span class="px:40 @scroll|7.5s|linear|infinite|reverse">SOUND</span>
        <span class="px:40 @scroll|7.5s|linear|infinite|reverse">SOUND</span>
      </div>
    </div>
    <div class="abs top:160 bottom:-280 left:1/2 translateX(-50%)">
      <img class="h:full" src="assets/img/cd-character.svg" alt="CD Cat" />
    </div>
  </div>

  <AppHeader />

  <main class="rel"></main>

  <SongPlayer />

  <AuthModal />
</template>
