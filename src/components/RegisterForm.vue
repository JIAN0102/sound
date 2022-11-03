<script setup>
import { ref } from 'vue';

const submission = ref(false);
const showAlert = ref(false);
const alertVarient = ref('bg:blue');
const alertMessage = ref('請稍等！正在為您註冊帳號');

function registerUser(values) {
  console.log(values);
  submission.value = true;
  showAlert.value = true;
  alertVarient.value = 'bg:blue';
  alertMessage.value = '請稍等！正在為您建立帳號';
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
  <VForm @submit="registerUser">
    <div>
      <label class="f:bold f:18 fg:white" for="registerName"
        >該如何稱呼你？</label
      >
      <VField
        id="registerName"
        class="block w:full h:60 px:26 mt:10 fg:white bg:black b:3|solid|transparent rounded outline:0 b:#f4db0d:focus"
        type="text"
        name="姓名"
        rules="required"
      />
      <ErrorMessage
        class="inline-block p:6|12 mt:10 f:12 fg:white bg:#ff3333 rounded"
        name="姓名"
      />
    </div>
    <div class="mt:20">
      <label class="f:bold f:18 fg:white" for="registerEmail"
        >你的電子郵件是什麼？</label
      >
      <VField
        id="registerEmail"
        class="block w:full h:60 px:26 mt:10 fg:white bg:black b:3|solid|transparent rounded outline:0 b:#f4db0d:focus"
        type="email"
        name="電子郵件"
        rules="required|email"
      />
      <ErrorMessage
        class="inline-block p:6|12 mt:10 f:12 fg:white bg:#ff3333 rounded"
        name="電子郵件"
      />
    </div>
    <div class="mt:20">
      <label class="f:bold f:18 fg:white" for="registerPassword">密碼</label>
      <VField
        id="registerPassword"
        class="block w:full h:60 px:26 mt:10 fg:white bg:black b:3|solid|transparent rounded outline:0 b:#f4db0d:focus"
        type="password"
        name="密碼"
        rules="required|min:6|max:100"
      />
      <ErrorMessage
        class="inline-block p:6|12 mt:10 f:12 fg:white bg:#ff3333 rounded"
        name="密碼"
      />
    </div>
    <div class="mt:20">
      <label class="f:bold f:18 fg:white" for="registerConfirmPassword"
        >確認密碼</label
      >
      <VField
        id="registerConfirmPassword"
        class="block w:full h:60 px:26 mt:10 fg:white bg:black b:3|solid|transparent rounded outline:0 b:#f4db0d:focus"
        type="password"
        name="確認密碼"
        rules="confirmed:@密碼"
      />
      <ErrorMessage
        class="inline-block p:6|12 mt:10 f:12 fg:white bg:#ff3333 rounded"
        name="確認密碼"
      />
    </div>
    <button
      class="rel w:full h:60 mt:40 f:bold f:20 bg:linear-gradient(to|right,#fd9d02,#f4db0d) rounded"
      type="submit"
      :disabled="submission"
    >
      <span
        class="abs top:1/2 left:10 w:40 h:40 b:4|solid|black rounded translateY(-50%)"
      ></span>
      註冊
    </button>
  </VForm>
</template>
