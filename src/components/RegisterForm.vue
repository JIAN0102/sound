<script setup>
import { ref, reactive } from 'vue';
import { storeToRefs } from 'pinia';
import { useModalStore } from '@/stores/modal';
import { useUserStore } from '@/stores/user';

const modalStore = useModalStore();
const { authType } = storeToRefs(modalStore);
const { toggleModal } = modalStore;

const userStore = useUserStore();
const { register } = userStore;

const schema = reactive({
  name: 'required',
  email: 'required|email',
  password: 'required|min:6|max:100',
  confirmPassword: 'confirmed:@password',
});
const submission = ref(false);

async function onSubmit(values, { resetForm }) {
  submission.value = true;

  try {
    await register(values);
    toggleModal();
    resetForm();
  } catch (err) {
    console.log(err);
  }

  submission.value = false;
}
</script>

<template>
  <VForm :validation-schema="schema" @submit="onSubmit">
    <div>
      <label class="f:bold fg:white f:18@md" for="registerName"
        >該如何稱呼你？</label
      >
      <VField
        id="registerName"
        class="block w:full h:60 px:24 mt:8 fg:white bg:black b:3|solid|transparent rounded outline:0 b:#777:focus"
        type="text"
        name="name"
      />
      <ErrorMessage
        v-slot="{ message }"
        class="flex ai:center gap-x:6 mt:8"
        as="div"
        name="name"
      >
        <span
          class="flex center-content w:16 h:16 f:12 fg:white bg:danger round"
          >!</span
        >
        <p class="f:13 fg:danger">{{ message }}</p>
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
      />
      <ErrorMessage
        v-slot="{ message }"
        class="flex ai:center gap-x:6 mt:8"
        as="div"
        name="email"
      >
        <span
          class="flex center-content w:16 h:16 f:12 fg:white bg:danger round"
          >!</span
        >
        <p class="f:13 fg:danger">{{ message }}</p>
      </ErrorMessage>
    </div>
    <div class="mt:20">
      <label class="f:bold fg:white f:18@md" for="registerPassword">密碼</label>
      <VField
        id="registerPassword"
        class="block w:full h:60 px:24 mt:8 fg:white bg:black b:3|solid|transparent rounded outline:0 b:#777:focus"
        type="password"
        name="password"
      />
      <ErrorMessage
        v-slot="{ message }"
        class="flex ai:center gap-x:6 mt:8"
        as="div"
        name="password"
      >
        <span
          class="flex center-content w:16 h:16 f:12 fg:white bg:danger round"
          >!</span
        >
        <p class="f:13 fg:danger">{{ message }}</p>
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
      />
      <ErrorMessage
        v-slot="{ message }"
        class="flex ai:center gap-x:6 mt:8"
        as="div"
        name="confirmPassword"
      >
        <span
          class="flex center-content w:16 h:16 f:12 fg:white bg:danger round"
          >!</span
        >
        <p class="f:13 fg:danger">{{ message }}</p>
      </ErrorMessage>
    </div>
    <button
      class="group rel w:full mt:40 {pointer-events:none}:disabled"
      type="submit"
      :disabled="submission"
    >
      <div
        class="abs top:1/2 left:1/2 full bg:linear-gradient(to|right,primary,secondary) rounded translate(-50%,-50%) .group:hover_{animation:bounce|1s|infinite}"
      ></div>
      <div class="rel flex center-content h:60">
        <div
          class="abs top:1/2 left:14 flex center-content w:32 h:32 bg:black round translateY(-50%)"
        >
          <img src="/assets/img/icon-user.svg" alt="" />
        </div>
        <span class="f:bold f:18">註冊</span>
      </div>
    </button>
    <p class="mt:20 f:bold fg:white t:center f:18@md">
      已經有帳號了？
      <span class="t:underline cursor:pointer" @click="authType = 'login'"
        >登入</span
      >
    </p>
  </VForm>
</template>
