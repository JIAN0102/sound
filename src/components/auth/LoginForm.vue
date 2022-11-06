<script setup>
import { ref } from 'vue';
import { useModalStore } from '@/stores/modal';
import { useUserStore } from '@/stores/user';

defineProps({
  type: {
    required: true,
    type: String,
  },
});

defineEmits(['change-type']);

const modalStore = useModalStore();
const { toggleAuthModal } = modalStore;

const userStore = useUserStore();
const { login } = userStore;

const submission = ref(false);
const showAlert = ref(false);
const alertVarient = ref('');
const alertMessage = ref('');

async function onSubmit(values, { resetForm }) {
  submission.value = true;
  showAlert.value = true;
  alertVarient.value = 'bg:blue';
  alertMessage.value = '登入中，請稍後';

  try {
    await login(values);

    toggleAuthModal();
    resetForm();

    submission.value = false;
    showAlert.value = false;
    alertVarient.value = '';
    alertMessage.value = '';
  } catch (err) {
    const errorCode = err.code;
    if (errorCode === 'auth/user-not-found') {
      alertMessage.value = '找不到您的帳戶';
    } else if (errorCode === 'auth/wrong-password') {
      alertMessage.value = '密碼輸入錯誤';
    }
    submission.value = false;
    alertVarient.value = 'bg:red';
  }
}
</script>

<template>
  <div
    v-if="showAlert"
    class="p:16 f:bold fg:white t:center"
    :class="alertVarient"
  >
    {{ alertMessage }}
  </div>
  <VForm @submit="onSubmit">
    <div>
      <label class="f:bold fg:white f:18@md" for="loginEmail">電子郵件</label>
      <VField
        id="loginEmail"
        class="block w:full h:60 px:24 mt:8 fg:white bg:black b:3|solid|transparent rounded outline:0 b:#777:focus"
        type="email"
        name="email"
        rules="required|email"
      />
      <ErrorMessage
        v-slot="{ message }"
        class="rel flex ai:center gap-x:6 mt:8"
        as="div"
        name="email"
      >
        <span
          class="flex center-content w:16 h:16 f:12 fg:white bg:#ee2828 round"
          >!</span
        >
        <p class="f:13 fg:#ee2828">{{ message }}</p>
      </ErrorMessage>
    </div>
    <div class="mt:20">
      <label class="f:bold fg:white f:18@md" for="loginPassword">密碼</label>
      <VField
        id="loginPassword"
        class="block w:full h:60 px:24 mt:8 fg:white bg:black b:3|solid|transparent rounded outline:0 b:#777:focus"
        type="password"
        name="password"
        rules="required|min:6|max:100"
      />
      <ErrorMessage
        v-slot="{ message }"
        class="rel flex ai:center gap-x:6 mt:8"
        as="div"
        name="password"
      >
        <span
          class="flex center-content w:16 h:16 f:12 fg:white bg:#ee2828 round"
          >!</span
        >
        <p class="f:13 fg:#ee2828">{{ message }}</p>
      </ErrorMessage>
    </div>
    <button
      class="rel w:full h:60 mt:40 f:bold f:18 bg:linear-gradient(to|right,primary,secondary) rounded @bounce|1s|infinite:hover {pointer-events:none}:disabled"
      type="submit"
      :disabled="submission"
    >
      <span
        class="abs top:1/2 left:10 w:40 h:40 b:4|solid|black rounded translateY(-50%)"
      ></span>
      登入
    </button>
    <p class="mt:20 f:bold fg:white t:center f:18@md">
      還沒有帳號嗎？
      <span
        class="t:underline cursor:pointer"
        @click="$emit('change-type', 'register')"
        >註冊</span
      >
    </p>
  </VForm>
</template>
