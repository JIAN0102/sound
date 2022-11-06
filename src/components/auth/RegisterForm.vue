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
const { register } = userStore;

const submission = ref(false);
const showAlert = ref(false);
const alertVarient = ref('');
const alertMessage = ref('');

async function onSubmit(values, { resetForm }) {
  submission.value = true;
  showAlert.value = true;
  alertVarient.value = 'bg:blue';
  alertMessage.value = '請稍等！正在為您建立帳號';

  try {
    await register(values);

    toggleAuthModal();
    resetForm();

    submission.value = false;
    showAlert.value = false;
    alertVarient.value = '';
    alertMessage.value = '';
  } catch (err) {
    const errorCode = err.code;
    if (errorCode === 'auth/email-already-in-use') {
      alertMessage.value = '這個信箱已有人使用，請試試其他信箱。';
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
      <label class="f:bold fg:white f:18@md" for="registerName"
        >該如何稱呼你？</label
      >
      <VField
        id="registerName"
        class="block w:full h:60 px:24 mt:8 fg:white bg:black b:3|solid|transparent rounded outline:0 b:#777:focus"
        type="text"
        name="name"
        rules="required"
      />
      <ErrorMessage
        v-slot="{ message }"
        class="rel flex ai:center gap-x:6 mt:8"
        as="div"
        name="name"
      >
        <span
          class="flex center-content w:16 h:16 f:12 fg:white bg:#ee2828 round"
          >!</span
        >
        <p class="f:13 fg:#ee2828">{{ message }}</p>
      </ErrorMessage>
    </div>
    <div class="mt:20">
      <label class="f:bold fg:white f:18@md" for="registerEmail"
        >你的電子郵件是什麼？</label
      >
      <VField
        id="registerEmail"
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
      <label class="f:bold fg:white f:18@md" for="registerPassword">密碼</label>
      <VField
        id="registerPassword"
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
    <div class="mt:20">
      <label class="f:bold fg:white f:18@md" for="registerConfirmPassword"
        >確認密碼</label
      >
      <VField
        id="registerConfirmPassword"
        class="block w:full h:60 px:24 mt:8 fg:white bg:black b:3|solid|transparent rounded outline:0 b:#777:focus"
        type="password"
        name="confirmPassword"
        rules="confirmed:@password"
      />
      <ErrorMessage
        v-slot="{ message }"
        class="rel flex ai:center gap-x:6 mt:8"
        as="div"
        name="confirmPassword"
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
      註冊
    </button>
    <p class="mt:20 f:bold fg:white t:center f:18@md">
      已經有帳號了？
      <span
        class="t:underline cursor:pointer"
        @click="$emit('change-type', 'login')"
        >登入</span
      >
    </p>
  </VForm>
</template>
