<script setup>
import { RouterLink, useRoute, useRouter } from 'vue-router';
import { storeToRefs } from 'pinia';
import { useModalStore } from '@/stores/modal';
import { useUserStore } from '@/stores/user';

const route = useRoute();
const router = useRouter();

const modalStore = useModalStore();
const { toggleAuthModal } = modalStore;

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
    class="fixed top:0 left:0 z:999 flex jc:space-between ai:center w:full h:80 px:20 pointer-events:none {h:220;px:80}@md"
  >
    <RouterLink
      class="flex ai:center pointer-events:auto"
      :to="{ name: 'home' }"
      exact-active-class=""
    >
      <div class="w:50 h:50 bg:white round"></div>
      <span class="ml:10 font-family:countach f:bold f:30 fg:white">SOUND</span>
    </RouterLink>

    <button
      v-if="!isLoggedIn"
      class="rel flex ai:center h:60 pr:30 pl:60 fg:white pointer-events:auto bg:black rounded @bounce|1s|infinite:hover"
      type="button"
      @click.prevent="toggleAuthModal"
    >
      <div
        class="abs top:1/2 left:10 w:40 h:40 bg:#333 round translateY(-50%)"
      ></div>
      登入 / 註冊
    </button>

    <nav
      v-else
      class="flex ai:center h:60 px:40 pointer-events:auto bg:black rounded"
    >
      <ul class="flex gap-x:20">
        <li>
          <RouterLink class="fg:white" :to="{ name: 'manage' }"
            >管理歌曲</RouterLink
          >
        </li>
        <li>
          <button class="fg:#777" type="button" @click.prevent="logoutUser">
            登出
          </button>
        </li>
      </ul>
    </nav>
  </header>
</template>
