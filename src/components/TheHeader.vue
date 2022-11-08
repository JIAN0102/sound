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
    class="fixed top:0 left:0 z:999 flex jc:space-between ai:center w:full h:100 px:20 pointer-events:none {h:140;px:80}@md"
  >
    <RouterLink
      class="flex ai:center pointer-events:auto"
      :to="{ name: 'home' }"
    >
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
          class="abs top:1/2 left:1/2 full bg:linear-gradient(to|right,primary,secondary) rounded opacity:0 translate(-50%,-50%) ~opacity|.2s .group:hover_{opacity:1;@bounce|1s|infinite}"
        ></div>
        <div class="rel flex ai:center gap-x:10 h:60 pl:14 pr:30">
          <div
            class="flex center-content w:32 h:32 bg:#333 round ~background-color|.2s .group:hover_{bg:black}"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 16 16"
            >
              <path
                d="M8,8c1.7,0,3-1.3,3-3S9.7,2,8,2S5,3.3,5,5S6.3,8,8,8z M12.4,10H3.6C3,9.9,2.4,10.3,2.3,11 C2.1,11.6,2,12.4,2,13.1C2,13.5,2.1,14,2.7,14h10.6c0.6,0,0.7-0.5,0.7-0.9c0-0.7-0.1-1.4-0.3-2.1C13.6,10.3,13,9.9,12.4,10z"
                fill="#fff"
              />
            </svg>
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
            type="button"
            :to="{ name: 'manage' }"
          >
            <div
              class="abs top:1/2 left:1/2 full bg:linear-gradient(to|right,primary,secondary) rounded opacity:0 translate(-50%,-50%) ~opacity|.2s .group:hover_{opacity:1;@bounce|1s|infinite}"
            ></div>
            <div class="rel flex ai:center gap-x:10 h:60 pl:14 pr:30">
              <div
                class="flex center-content w:32 h:32 bg:#333 round ~background-color|.2s .group:hover_{bg:black}"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                >
                  <path
                    d="M8,15c-0.6,0-1.2-0.5-1.2-1.2v-0.7c-0.6-0.1-1.1-0.4-1.6-0.7l-0.5,0.5 c-0.5,0.4-1.2,0.4-1.6-0.1c-0.4-0.4-0.4-1.1,0-1.5l0.5-0.5C3.2,10.3,3,9.7,2.9,9.2H2.2C1.5,9.2,1,8.6,1,8s0.5-1.2,1.2-1.2h0.7 C3,6.3,3.2,5.7,3.6,5.2L3.1,4.7C2.6,4.2,2.7,3.5,3.2,3.1c0.4-0.4,1.1-0.4,1.5,0l0.5,0.5C5.7,3.2,6.3,3,6.8,2.9V2.2 C6.8,1.5,7.4,1,8,1s1.2,0.5,1.2,1.2v0.7c0.6,0.1,1.1,0.4,1.6,0.7l0.5-0.5c0.5-0.4,1.2-0.4,1.6,0.1c0.4,0.4,0.4,1.1,0,1.5l-0.5,0.5 c0.3,0.5,0.5,1.1,0.7,1.6h0.7C14.5,6.8,15,7.4,15,8s-0.5,1.2-1.2,1.2h-0.7c-0.1,0.6-0.4,1.1-0.7,1.6l0.5,0.5 c0.4,0.5,0.4,1.2-0.1,1.6c-0.4,0.4-1.1,0.4-1.5,0l-0.5-0.5c-0.5,0.3-1.1,0.5-1.6,0.7v0.7C9.2,14.5,8.6,15,8,15z M8,5.1 C6.4,5.1,5.1,6.4,5.1,8s1.3,2.9,2.9,2.9s2.9-1.3,2.9-2.9l0,0C10.9,6.4,9.6,5.1,8,5.1z"
                    fill="#fff"
                  />
                </svg>
              </div>
              <span class="f:bold fg:white ~color|.2s .group:hover_{fg:black}">
                管理歌曲</span
              >
            </div>
          </RouterLink>
        </li>
        <li>
          <button
            class="w:60 h:60 bg:black fg:white rounded"
            type="button"
            @click.prevent="logoutUser"
          ></button>
        </li>
      </ul>
    </nav>

    <button
      class="rel flex flex:col center-content w:48 h:36 pointer-events:auto bg:black rounded hide@md {block;w:8;h:2;bg:white}>span mt:3>span~span"
      type="button"
    >
      <span></span>
      <span></span>
      <span></span>
    </button>
  </header>

  <nav
    class="hide! fixed top:20 left:10 right:10 z:998 pt:80 pb:40 bg:black r:30"
  >
    <ul class="f:bold f:20 fg:white t:center">
      <li @click.prevent="toggleModal">登入 / 註冊</li>
    </ul>
  </nav>
</template>
