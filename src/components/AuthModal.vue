<script setup>
import { ref } from 'vue';
import { useModalStore } from '@/stores/modal';
import { storeToRefs } from 'pinia';

const modalStore = useModalStore();
const { isOpen } = storeToRefs(modalStore);
const { toggleAuthModal } = modalStore;

const type = ref('login');
</script>

<template>
  <div
    class="fixed inset:0 z:9999 overflow-x:hidden overflow-y:auto bg:repeating-linear-gradient(40deg,#19191e,#19191e|3px,white/.1|3px,white/.1|8px) bd:blur(5) opacity:0 invisible ~opacity|.3s,visibility|.3s {opacity:1;visible}.is-open"
    :class="{ 'is-open': isOpen }"
    @click.prevent.self="toggleAuthModal"
  >
    <div
      class="flex ai:center max-w:640 min-h:calc(100%-80px) px:20 m:40|auto pointer-events:none"
    >
      <div class="rel w:full bg:black r:60 pointer-events:auto">
        <button
          class="abs top:30 right:30 w:40 h:40 b:3|solid|#333 round"
          type="button"
          @click.prevent="toggleAuthModal"
        >
          <span
            class="abs top:1/2 left:1/2 w:16 h:3 bg:white rounded translate(-50%,-50%)|rotate(45deg)"
          ></span>
          <span
            class="abs top:1/2 left:1/2 w:16 h:3 bg:white rounded translate(-50%,-50%)|rotate(-45deg)"
          ></span>
        </button>
        <div class="p:60|20|20">
          <div class="flex jc:center">
            <div class="pr:30">
              <h3
                class="f:bold f:28 fg:#777 cursor:pointer fg:white:hover fg:white.is-active"
                :class="{ 'is-active': type === 'login' }"
                @click.prevent="type = 'login'"
              >
                登入
              </h3>
            </div>
            <div class="pl:30 bl:1|solid|white">
              <h3
                class="f:bold f:28 fg:#777 cursor:pointer fg:white:hover fg:white.is-active"
                :class="{ 'is-active': type === 'register' }"
                @click.prevent="type = 'register'"
              >
                註冊
              </h3>
            </div>
          </div>
        </div>
        <div class="p:40 bg:#333 b:10|solid|black r:60">
          <VeeForm v-show="type === 'login'">
            <div>
              <label class="f:bold f:20 fg:white" for="email">電子郵件</label>
              <VeeField
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
          </VeeForm>
          <form v-show="type === 'register'"></form>
        </div>
      </div>
    </div>
  </div>
</template>
