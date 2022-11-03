<script setup>
import { ref } from 'vue';

const submission = ref(false);
const showAlert = ref(false);
const alertVarient = ref('bg:blue');
const alertMessage = ref('登入中，請稍後');

function loginUser(values) {
  console.log(values);
  submission.value = true;
  showAlert.value = true;
  alertVarient.value = 'bg:blue';
  alertMessage.value = '登入成功';
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
  <VForm @submit="loginUser">
    <div>
      <label class="f:bold f:18 fg:white" for="loginEmail">電子郵件</label>
      <VField
        id="loginEmail"
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
      <label class="f:bold f:18 fg:white" for="loginPassword">密碼</label>
      <VField
        id="loginPassword"
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
    <button
      class="rel w:full h:60 mt:40 f:bold f:20 bg:linear-gradient(to|right,#fd9d02,#f4db0d) rounded"
      type="submit"
      :disabled="submission"
    >
      <span
        class="abs top:1/2 left:10 w:40 h:40 b:4|solid|black rounded translateY(-50%)"
      ></span>
      登入
    </button>
  </VForm>
</template>
