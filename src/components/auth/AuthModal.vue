<script setup>
import { ref } from 'vue';
import { storeToRefs } from 'pinia';
import { useModalStore } from '@/stores/modal';
import LoginForm from '@/components/auth/LoginForm.vue';
import RegisterForm from '@/components/auth/RegisterForm.vue';

const modalStore = useModalStore();
const { isOpen } = storeToRefs(modalStore);
const { toggleAuthModal } = modalStore;

const type = ref('login');
</script>

<template>
  <div
    class="fixed inset:0 z:9999 overflow-x:hidden overflow-y:auto bg:repeating-linear-gradient(40deg,white/.2,white/.2|3px,white/.1|3px,white/.1|8px) bd:blur(5) opacity:0 invisible ~opacity|.3s,visibility|.3s {opacity:1;visible}.is-open"
    :class="{ 'is-open': isOpen }"
  >
    <div
      class="flex ai:center max-w:640 min-h:calc(100%-80px) px:20 m:40|auto pointer-events:none"
    >
      <div
        class="rel w:full bg:black r:60 pointer-events:auto opacity:0 translateY(15%) ~opacity|.5s,transform|.5s .is-open_{opacity:1;translateY(0)}"
      >
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
                class="f:bold f:28 fg:#777 cursor:pointer fg:white.is-active"
                :class="{ 'is-active': type === 'login' }"
                @click.prevent="type = 'login'"
              >
                登入
              </h3>
            </div>
            <div class="pl:30 bl:1|solid|white">
              <h3
                class="f:bold f:28 fg:#777 cursor:pointer fg:white.is-active"
                :class="{ 'is-active': type === 'register' }"
                @click.prevent="type = 'register'"
              >
                註冊
              </h3>
            </div>
          </div>
        </div>
        <div class="p:40 bg:#333 b:10|solid|black r:60">
          <LoginForm v-if="type === 'login'" />
          <RegisterForm v-else />
        </div>
      </div>
    </div>
  </div>
</template>
