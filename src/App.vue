<script setup>
import { onMounted } from 'vue';
import { storeToRefs } from 'pinia';
import { useUserStore } from '@/stores/user';
import { auth } from '@/includes/firebase';
import AppHeader from '@/components/layout/AppHeader.vue';
import SongPlayer from '@/components/song/SongPlayer.vue';
import AuthModal from '@/components/auth/AuthModal.vue';

const userStore = useUserStore();
const { isLoggedIn } = storeToRefs(userStore);

onMounted(() => {
  if (auth.currentUser) {
    isLoggedIn.value = true;
  }
});
</script>

<template>
  <div class="fixed inset:0 overflow:hidden">
    <div class="abs inset:0 bg:linear-gradient(#282828,black)"></div>
    <div
      class="abs inset:0 bg:repeating-linear-gradient(40deg,#19191e,#19191e|3px,transparent|3px,transparent|8px)"
    ></div>
    <div
      class="abs top:1/2 left:1/2 pointer-events:none opacity:.03 translate(-50%,-50%)|rotate(-15deg) mt:-9vh>div~div"
    >
      <div
        class="flex font-family:countach f:bold f:50vh fg:white lh:1 white-space:nowrap"
      >
        <span class="px:40 @scroll|7.5s|linear|infinite">SOUND</span>
        <span class="px:40 @scroll|7.5s|linear|infinite">SOUND</span>
        <span class="px:40 @scroll|7.5s|linear|infinite">SOUND</span>
        <span class="px:40 @scroll|7.5s|linear|infinite">SOUND</span>
      </div>
      <div
        class="flex font-family:countach f:bold f:50vh fg:white lh:1 white-space:nowrap"
      >
        <span class="px:40 @scroll|7.5s|linear|infinite|reverse">SOUND</span>
        <span class="px:40 @scroll|7.5s|linear|infinite|reverse">SOUND</span>
        <span class="px:40 @scroll|7.5s|linear|infinite|reverse">SOUND</span>
        <span class="px:40 @scroll|7.5s|linear|infinite|reverse">SOUND</span>
      </div>
      <div
        class="flex font-family:countach f:bold f:50vh fg:white lh:1 white-space:nowrap"
      >
        <span class="px:40 @scroll|7.5s|linear|infinite">SOUND</span>
        <span class="px:40 @scroll|7.5s|linear|infinite">SOUND</span>
        <span class="px:40 @scroll|7.5s|linear|infinite">SOUND</span>
        <span class="px:40 @scroll|7.5s|linear|infinite">SOUND</span>
      </div>
      <div
        class="flex font-family:countach f:bold f:50vh fg:white lh:1 white-space:nowrap"
      >
        <span class="px:40 @scroll|7.5s|linear|infinite|reverse">SOUND</span>
        <span class="px:40 @scroll|7.5s|linear|infinite|reverse">SOUND</span>
        <span class="px:40 @scroll|7.5s|linear|infinite|reverse">SOUND</span>
        <span class="px:40 @scroll|7.5s|linear|infinite|reverse">SOUND</span>
      </div>
    </div>
    <div
      class="abs top:120 bottom:-200 left:1/2 translateX(-50%) {top:160;bottom:-400}@md"
    >
      <img
        class="h:full @rotate|1s|linear|infinite"
        src="assets/img/cd-character.svg"
        alt="CD Cat"
      />
    </div>
  </div>

  <AppHeader />

  <main
    class="rel mt:100vh px:20 pb:210 bg:linear-gradient(transparent,white/.25) px:80@md"
  >
    <div
      class="grid-cols:1 gap:40 grid-cols:9@xs grid-cols:13@lg grid-col-start:2>div:nth(4n+3)@xs&<lg grid-col-start:2>div:nth(6n+4)@lg"
    >
      <div class="grid-col-span:4@xs">
        <div class="h:80 bg:black rounded"></div>
      </div>
      <div class="grid-col-span:4@xs">
        <div class="h:80 bg:black rounded"></div>
      </div>
      <div class="grid-col-span:4@xs">
        <div class="h:80 bg:black rounded"></div>
      </div>
      <div class="grid-col-span:4@xs">
        <div class="h:80 bg:black rounded"></div>
      </div>
      <div class="grid-col-span:4@xs">
        <div class="h:80 bg:black rounded"></div>
      </div>
      <div class="grid-col-span:4@xs">
        <div class="h:80 bg:black rounded"></div>
      </div>
    </div>
  </main>

  <SongPlayer />

  <AuthModal />
</template>
