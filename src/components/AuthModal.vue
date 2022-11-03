<script setup>
import { useModalStore } from '@/stores/modal';
import { storeToRefs } from 'pinia';

const modalStore = useModalStore();
const { isOpen } = storeToRefs(modalStore);
</script>

<template>
  <div
    class="fixed inset:0 z:9999 overflow-x:hidden overflow-y:auto bg:repeating-linear-gradient(40deg,#19191e,#19191e|3px,white/.1|3px,white/.1|8px) bd:blur(5) opacity:0 invisible ~opacity|.3s,visibility|.3s {opacity:1;visible}.is-open"
    :class="{ 'is-open': isOpen }"
  >
    <div
      class="rel flex ai:center max-w:640 min-h:calc(100%-80px) px:20 m:40|auto pointer-events:none"
    >
      <div class="w:full bg:black r:60 pointer-events:auto">
        <div class="p:60|20|20"></div>
        <div class="p:40 bg:#333 b:10|solid|black r:60">
          <div>
            <label class="f:bold f:20 fg:white" for="email">電子郵件</label>
            <input
              id="email"
              class="block w:full h:60 px:26 mt:10 fg:white bg:black b:3|solid|transparent rounded outline:0 b:#f4db0d:focus"
              type="email"
            />
          </div>
          <div class="mt:20">
            <label class="f:bold f:20 fg:white" for="password">密碼</label>
            <input
              id="password"
              class="block w:full h:60 px:26 mt:10 fg:white bg:black b:3|solid|transparent rounded outline:0 b:#f4db0d:focus"
              type="password"
            />
          </div>
          <button
            class="rel w:full h:60 mt:40 f:bold f:20 bg:linear-gradient(to|right,#fd9d02,#f4db0d) rounded"
            type="button"
          >
            <span
              class="abs top:1/2 left:10 w:40 h:40 b:4|solid|black rounded translateY(-50%)"
            ></span>
            登入
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
