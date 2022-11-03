<script setup>
import { useModalStore } from '@/stores/modal';

const modalStore = useModalStore();
const { toggleAuthModal } = modalStore;
</script>

<template>
  <header class="fixed top:80 left:80 right:80 flex jc:space-between ai:center">
    <div class="w:130 h:50 bg:white"></div>
    <nav class="flex gap-x:20">
      <ul>
        <li>
          <a href=""></a>
        </li>
        <li>
          <a href=""></a>
        </li>
      </ul>
      <button
        class="rel flex ai:center h:60 pr:30 pl:60 fg:white bg:black rounded"
        type="button"
        @click.prevent="toggleAuthModal"
      >
        <div
          class="abs top:1/2 left:10 w:40 h:40 bg:#333 round translateY(-50%)"
        ></div>
        登入 / 註冊
      </button>
    </nav>
  </header>
</template>
