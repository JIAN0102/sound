<script setup>
import { ref, reactive } from 'vue';
import { storeToRefs } from 'pinia';
import { useModalStore } from '@/stores/modal';
import { useUserStore } from '@/stores/user';
import IconUser from '@/components/icons/IconUser.vue';
import IconAlert from '@/components/icons/IconAlert.vue';

const modalStore = useModalStore();
const { authType } = storeToRefs(modalStore);

const userStore = useUserStore();
const { login } = userStore;

const schema = reactive({
  email: 'required|email',
  password: 'required|min:6|max:100',
});
const submission = ref(false);

async function onSubmit(values) {
  submission.value = true;

  try {
    await login(values);
    window.location.reload();
  } catch (err) {
    console.log(err);
  }

  submission.value = false;
}
</script>

<template>
  <VForm :validation-schema="schema" @submit="onSubmit">
    <div>
      <label class="f:bold fg:white f:18@md" for="loginEmail">電子郵件</label>
      <VField v-slot="{ field, errorMessage, meta }" name="email" label="姓名">
        <div class="rel">
          <input
            v-bind="field"
            id="loginEmail"
            class="block w:full h:60 pl:24 pr:48 mt:8 fg:white bg:black b:3|solid|transparent rounded outline:0 b:#777:focus"
            :class="{ 'b:danger!': !meta.valid && meta.touched }"
            type="email"
          />
          <div
            v-if="!meta.valid && meta.touched"
            class="abs top:1/2 right:20 fg:danger translateY(-50%)"
          >
            <IconAlert />
          </div>
        </div>
        <div
          v-if="!meta.valid && meta.touched"
          class="flex ai:center gap-x:6 mt:8 f:13 fg:danger"
        >
          {{ errorMessage }}
        </div>
      </VField>
    </div>
    <div class="mt:20">
      <label class="f:bold fg:white f:18@md" for="loginPassword">密碼</label>
      <VField
        v-slot="{ field, errorMessage, meta }"
        name="password"
        label="密碼"
      >
        <div class="rel">
          <input
            v-bind="field"
            id="loginPassword"
            class="block w:full h:60 pl:24 pr:48 mt:8 fg:white bg:black b:3|solid|transparent rounded outline:0 b:#777:focus"
            :class="{ 'b:danger!': !meta.valid && meta.touched }"
            type="password"
          />
          <div
            v-if="!meta.valid && meta.touched"
            class="abs top:1/2 right:20 fg:danger translateY(-50%)"
          >
            <IconAlert />
          </div>
        </div>
        <div
          v-if="errorMessage"
          class="flex ai:center gap-x:6 mt:8 f:13 fg:danger"
        >
          {{ errorMessage }}
        </div>
      </VField>
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
          class="abs top:1/2 left:10 flex center-content w:40 h:40 fg:white bg:black round translateY(-50%)"
        >
          <IconUser />
        </div>
        <span class="f:bold f:18">登入</span>
      </div>
    </button>
    <p class="mt:20 f:bold fg:white t:center f:18@md">
      還沒有帳號嗎？
      <span
        class="t:underline cursor:pointer"
        @click.prevent="authType = 'register'"
        >註冊</span
      >
    </p>
  </VForm>
</template>
