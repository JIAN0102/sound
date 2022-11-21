<script setup>
import { storeToRefs } from 'pinia';
import { useModalStore } from '@/stores/modal';
import BaseCard from '@/components/BaseCard.vue';
import LoginForm from '@/components/LoginForm.vue';
import RegisterForm from '@/components/RegisterForm.vue';

const modalStore = useModalStore();
const { isModalOpen, authType } = storeToRefs(modalStore);
const { toggleModal } = modalStore;
</script>

<template>
  <Transition name="fade">
    <div
      v-if="isModalOpen"
      class="fixed inset:0 z:1000 overflow-x:hidden overflow-y:auto bg:repeating-linear-gradient(40deg,white/.15,white/.15|3px,white/.05|3px,white/.05|8px) bd:blur(7.5)"
    >
      <div class="flex ai:center max-w:600 min-h:calc(100%-120px) m:60|auto">
        <div
          class="rel w:full ~transform|.5s :is(.fade-enter-from,.fade-leave-to)_{translateY(15%)}"
        >
          <button
            class="abs top:20 right:20 z:10 w:40 h:40 b:3|solid|#333 round {top:30;right:30}@md {abs;top:1/2;left:1/2;w:16;h:3;bg:white;rounded}>span"
            type="button"
            @click.prevent="toggleModal"
          >
            <span class="translate(-50%,-50%)|rotate(45)"></span>
            <span class="translate(-50%,-50%)|rotate(-45)"></span>
          </button>
          <BaseCard>
            <template #header>
              <div class="flex jc:center">
                <div class="pr:20 pr:30@md">
                  <h3
                    class="f:bold f:24 fg:#777 cursor:pointer f:28@md fg:white.is-active"
                    :class="{ 'is-active': authType === 'login' }"
                    @click.prevent="authType = 'login'"
                  >
                    登入
                  </h3>
                </div>
                <div class="pl:20 bl:1|solid|white pl:30@md">
                  <h3
                    class="f:bold f:24 fg:#777 cursor:pointer f:28@md fg:white.is-active"
                    :class="{ 'is-active': authType === 'register' }"
                    @click.prevent="authType = 'register'"
                  >
                    註冊
                  </h3>
                </div>
              </div>
            </template>

            <template #main>
              <LoginForm v-if="authType === 'login'" />
              <RegisterForm v-else />
            </template>
          </BaseCard>
        </div>
      </div>
    </div>
  </Transition>
</template>
