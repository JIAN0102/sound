<script setup>
import { useModalStore } from '@/stores/modal';

const modalStore = useModalStore();
const { toggleAuthModal } = modalStore;
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
      class="rel flex ai:center h:60 pr:30 pl:60 fg:white bg:black rounded @bounce|1.5s|infinite:hover"
      type="button"
      @click.prevent="toggleAuthModal"
    >
      <div
        class="abs top:1/2 left:10 w:40 h:40 bg:#333 round translateY(-50%)"
      ></div>
      登入 / 註冊
    </button>
  </header>
</template>
