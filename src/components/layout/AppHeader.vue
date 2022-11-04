<script setup>
import { storeToRefs } from 'pinia';
import { useModalStore } from '@/stores/modal';
import { useUserStore } from '@/stores/user';

const modalStore = useModalStore();
const { toggleAuthModal } = modalStore;

const userStore = useUserStore();
const { isLoggedIn } = storeToRefs(userStore);
const { logout } = userStore;
</script>

<template>
  <header
    class="fixed top:0 left:0 z:999 flex jc:space-between ai:center w:full p:20|20|0 p:80|80|0@md"
  >
    <div class="flex ai:center">
      <div class="w:50 h:50 bg:white round"></div>
      <span class="ml:10 font-family:countach f:bold f:30 fg:white">SOUND</span>
    </div>
    <button
      v-if="!isLoggedIn"
      class="rel flex ai:center h:60 pr:30 pl:60 fg:white bg:black rounded @bounce|1s|infinite:hover"
      type="button"
      @click.prevent="toggleAuthModal"
    >
      <div
        class="abs top:1/2 left:10 w:40 h:40 bg:#333 round translateY(-50%)"
      ></div>
      登入 / 註冊
    </button>
    <nav v-else>
      <ul class="flex gap-x:20 fg:white">
        <li>
          <button type="button">管理歌曲</button>
        </li>
        <li>
          <button type="button" @click.prevent="logout">登出</button>
        </li>
      </ul>
    </nav>
  </header>
</template>
