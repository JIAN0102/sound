<script setup>
import { ref } from 'vue';
import { storeToRefs } from 'pinia';
import { useModalStore } from '@/stores/modal';
import BaseCard from '@/components/base/BaseCard.vue';
import LoginForm from '@/components/auth/LoginForm.vue';
import RegisterForm from '@/components/auth/RegisterForm.vue';

const modalStore = useModalStore();
const { isOpen } = storeToRefs(modalStore);
const { toggleAuthModal } = modalStore;

const type = ref('login');
</script>

<template>
  <div
    class="fixed inset:0 z:9998 overflow-x:hidden overflow-y:auto bg:repeating-linear-gradient(40deg,white/.2,white/.2|3px,white/.15|3px,white/.15|8px) bd:blur(5) opacity:0 invisible ~opacity|.3s,visibility|.3s {opacity:1;visible}.is-open"
    :class="{ 'is-open': isOpen }"
  >
    <div class="flex ai:center max-w:600 min-h:calc(100%-80px) m:40|auto">
      <div
        class="rel w:full opacity:0 translateY(15%) ~opacity|.5s,transform|.5s .is-open_{opacity:1;translateY(0)}"
      >
        <button
          class="abs top:20 right:20 w:40 h:40 b:3|solid|#333 round {top:30;right:30}@md {abs;top:1/2;left:1/2;w:16;h:3;bg:white;rounded}>span"
          type="button"
          @click.prevent="toggleAuthModal"
        >
          <span class="translate(-50%,-50%)|rotate(45deg)"></span>
          <span class="translate(-50%,-50%)|rotate(-45deg)"></span>
        </button>
        <BaseCard>
          <template #header>
            <div class="flex jc:center">
              <div class="pr:20 pr:30@md">
                <h3
                  class="f:bold f:24 fg:#777 cursor:pointer f:28@md fg:white.is-active"
                  :class="{ 'is-active': type === 'login' }"
                  @click.prevent="type = 'login'"
                >
                  登入
                </h3>
              </div>
              <div class="pl:20 bl:1|solid|white pl:30@md">
                <h3
                  class="f:bold f:24 fg:#777 cursor:pointer f:28@md fg:white.is-active"
                  :class="{ 'is-active': type === 'register' }"
                  @click.prevent="type = 'register'"
                >
                  註冊
                </h3>
              </div>
            </div>
          </template>

          <template #main>
            <LoginForm
              v-if="type === 'login'"
              :type="type"
              @change-type="type = 'register'"
            />
            <RegisterForm v-else :type="type" @change-type="type = 'login'" />
          </template>
        </BaseCard>
      </div>
    </div>
  </div>
</template>
