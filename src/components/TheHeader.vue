<script setup>
import { ref } from 'vue';
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

const isMenuOpen = ref(false);

async function handleClick() {
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
    class="fixed top:0 left:0 z:999 flex jc:space-between ai:center w:full h:100 px:20 pointer-events:none {h:140;px:80}@md"
  >
    <RouterLink class="pointer-events:auto" :to="{ name: 'home' }">
      <div class="w:40 h:40 bg:white round {w:50;h:50}@md"></div>
    </RouterLink>

    <nav class="pointer-events:auto hide@<md">
      <button
        v-if="!isLoggedIn"
        class="group rel bg:black rounded"
        type="button"
        @click.prevent="toggleModal"
      >
        <div
          class="abs top:1/2 left:1/2 full bg:linear-gradient(to|right,primary,secondary) rounded opacity:0 translate(-50%,-50%) ~opacity|.2s .group:hover_{opacity:1;animation:bounce|1s|infinite}"
        ></div>
        <div class="rel flex ai:center gap-x:10 h:60 pl:14 pr:30">
          <div
            class="flex center-content w:32 h:32 bg:#333 round ~background-color|.2s .group:hover_{bg:black}"
          >
            <img src="/assets/img/icon-user.svg" alt="" />
          </div>
          <span class="f:bold fg:white ~color|.2s .group:hover_{fg:black}"
            >登入 / 註冊</span
          >
        </div>
      </button>
      <ul v-else class="flex ai:center gap-x:20">
        <li>
          <RouterLink
            class="group rel block bg:black rounded"
            :to="{ name: 'manage' }"
          >
            <div
              class="abs top:1/2 left:1/2 full bg:linear-gradient(to|right,primary,secondary) rounded opacity:0 translate(-50%,-50%) ~opacity|.2s .group:hover_{opacity:1;animation:bounce|1s|infinite}"
            ></div>
            <div class="rel flex ai:center gap-x:10 h:60 pl:14 pr:30">
              <div
                class="flex center-content w:32 h:32 bg:#333 round ~background-color|.2s .group:hover_{bg:black}"
              >
                <img class="w:18" src="/assets/img/icon-setting.svg" alt="" />
              </div>
              <span class="f:bold fg:white ~color|.2s .group:hover_{fg:black}">
                管理歌曲</span
              >
            </div>
          </RouterLink>
        </li>
        <li>
          <button
            class="flex center-content w:60 h:60 bg:black round"
            type="button"
            @click.prevent="handleClick"
          >
            <img src="/assets/img/icon-logout.svg" alt="" />
          </button>
        </li>
      </ul>
    </nav>

    <button
      class="rel flex flex:col center-content w:48 h:36 pointer-events:auto bg:black rounded hide@md {block;w:8;h:2;bg:white}>span mt:3>span~span"
      type="button"
      @click="isMenuOpen = !isMenuOpen"
    >
      <span></span>
      <span></span>
      <span></span>
    </button>
  </header>

  <nav
    class="fixed top:20 left:10 right:10 z:998 hide pt:80 pb:40 bg:black r:30"
    :class="{ 'block!': isMenuOpen }"
  >
    <ul class="f:bold f:20 fg:white t:center">
      <li @click.prevent="toggleModal">登入 / 註冊</li>
    </ul>
  </nav>
</template>
