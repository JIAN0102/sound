<script setup>
import { RouterLink, useRoute, useRouter } from 'vue-router';
import { storeToRefs } from 'pinia';
import { useModalStore } from '@/stores/modal';
import { useUserStore } from '@/stores/user';

const route = useRoute();
const router = useRouter();

const modalStore = useModalStore();
const { toggleModal } = modalStore;

const userStore = useUserStore();
const { isLoggedIn } = storeToRefs(userStore);
const { logout } = userStore;

async function logoutUser() {
  await logout();

  if (route.meta.requiresAuth) {
    router.push({
      name: 'home',
    });
  }
}
</script>

<template>
  <header
    class="fixed top:0 left:0 z:999 flex jc:space-between ai:center w:full h:100 px:20 pointer-events:none {h:220;px:80}@md"
  >
    <RouterLink
      class="flex ai:center pointer-events:auto"
      :to="{ name: 'home' }"
    >
      <div class="w:40 h:40 bg:white round {w:50;h:50}@md"></div>
      <span class="ml:8 font-family:countach f:24 fg:white {ml:10;f:30}@md"
        >SOUND</span
      >
    </RouterLink>

    <div class="pointer-events:auto hide@<md">
      <button
        v-if="!isLoggedIn"
        class="rel flex ai:center gap-x:8 h:50 pl:8 pr:20 bg:black rounded {gap-x:10;h:60;pl:10;pr:30}@md @bounce|1s|infinite:hover"
        type="button"
        @click.prevent="toggleModal"
      >
        <div class="w:34 h:34 bg:#333 round {w:40;h:40}@md"></div>
        <span class="f:14 fg:white f:16@md">登入 / 註冊</span>
      </button>

      <nav
        v-else
        class="flex ai:center gap-x:10 h:50 pl:20 pr:8 f:14 fg:white bg:black rounded {gap-x:20;h:60;pl:30;pr:10;f:16}@md"
      >
        <RouterLink :to="{ name: 'manage' }">管理歌曲</RouterLink>
        <button
          class="w:68 h:34 bg:#333 rounded {w:80;h:40}@md"
          type="button"
          @click.prevent="logoutUser"
        >
          登出
        </button>
      </nav>
    </div>

    <button
      class="rel flex center-content w:48 h:32 pointer-events:auto bg:black rounded hide@md"
      type="button"
    >
      <div class="rel w:16 h:10 {abs;left:0;w:full;h:2;bg:white}_span">
        <span class="top:0"></span>
        <span class="top:4"></span>
        <span class="top:8"></span>
      </div>
    </button>
  </header>

  <nav class="hide! fixed top:20 left:10 right:10 pt:80 pb:40 bg:black r:30">
    <ul class="f:bold f:20 fg:white t:center">
      <li @click.prevent="toggleModal">登入 / 註冊</li>
    </ul>
  </nav>
</template>
