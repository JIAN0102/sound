<script setup>
import { ref, reactive } from 'vue';
import { storeToRefs } from 'pinia';
import { useModalStore } from '@/stores/modal';
import { useUserStore } from '@/stores/user';
import IconLoading from '@/components/icons/IconLoading.vue';
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
const errorCodeMessage = ref('');

async function onSubmit(values) {
  submission.value = true;
  errorCodeMessage.value = '';

  try {
    await login(values);
    window.location.reload();
  } catch (error) {
    const errorCode = error.code;
    switch (errorCode) {
      case 'auth/user-not-found':
        errorCodeMessage.value = '找不到您的帳戶';
        break;
      case 'auth/wrong-password':
        errorCodeMessage.value = '密碼輸入錯誤';
        break;
      case 'auth/too-many-requests':
        errorCodeMessage.value = '發送過多次請求，請稍後再嘗試。';
    }
  }

  submission.value = false;
}
</script>

<template>
  <div
    v-if="errorCodeMessage"
    class="flex center-content gap-x:5 mb:10 f:14 fg:danger"
  >
    <IconAlert />
    {{ errorCodeMessage }}
  </div>
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
      class="group rel w:full mt:40 bg:primary rounded {pointer-events:none}:disabled"
      type="submit"
      :disabled="submission"
    >
      <div
        class="abs inset:0 rounded opacity:0 @backgorundColor|2s|linear|infinite ~opacity|.3s .group:hover_{opacity:1}"
      ></div>
      <div class="rel flex center-content h:60">
        <div
          class="abs top:1/2 left:10 flex center-content w:40 h:40 fg:white bg:black round translateY(-50%)"
        >
          <IconLoading v-if="submission" />
          <IconUser v-else :width="20" :height="20" />
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
