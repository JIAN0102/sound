<script setup>
import { ref } from 'vue';
import { storeToRefs } from 'pinia';
import { useModalStore } from '@/stores/modal';
import BaseModal from '@/components/BaseModal.vue';
import LoginForm from '@/components/LoginForm.vue';
import RegisterForm from '@/components/RegisterForm.vue';

const modalStore = useModalStore();
const { isModalOpen } = storeToRefs(modalStore);
const { toggleModal } = modalStore;

const type = ref('login');
</script>

<template>
  <Transition name="fade">
    <BaseModal v-if="isModalOpen">
      <template #button>
        <button
          class="abs top:20 right:20 z:10 w:40 h:40 b:3|solid|#212121 round {top:30;right:30}@md {abs;top:1/2;left:1/2;w:16;h:3;bg:white;rounded}>span"
          type="button"
          @click="toggleModal"
        >
          <span class="translate(-50%,-50%)|rotate(45)"></span>
          <span class="translate(-50%,-50%)|rotate(-45)"></span>
        </button>
      </template>

      <template #header>
        <div class="flex jc:center">
          <div class="pr:20 pr:30@md">
            <h3
              class="f:bold f:24 fg:#696969 cursor:pointer f:28@md fg:white.is-active"
              :class="{ 'is-active': type === 'login' }"
              @click="type = 'login'"
            >
              登入
            </h3>
          </div>
          <div class="pl:20 bl:1|solid|white pl:30@md">
            <h3
              class="f:bold f:24 fg:#696969 cursor:pointer f:28@md fg:white.is-active"
              :class="{ 'is-active': type === 'register' }"
              @click="type = 'register'"
            >
              註冊
            </h3>
          </div>
        </div>
      </template>

      <template #body>
        <LoginForm
          v-if="type === 'login'"
          @change-type="(value) => (type = value)"
        />
        <RegisterForm v-else @change-type="(value) => (type = value)" />
      </template>
    </BaseModal>
  </Transition>
</template>
