<script setup>
import { ref } from 'vue';

const submission = ref(false);
const showAlert = ref(false);
const alertVarient = ref('bg:blue');
const alertMessage = ref('登入中，請稍後');

function onSubmit(values) {
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
  <VForm @submit="onSubmit">
    <div>
      <label class="f:bold f:18 fg:white" for="loginEmail">電子郵件</label>
      <VField
        id="loginEmail"
        class="block w:full h:60 px:26 mt:10 fg:white bg:black b:3|solid|transparent rounded outline:0 b:#f4db0d:focus"
        type="email"
        name="email"
        rules="required|email"
      />
      <ErrorMessage
        class="rel inline-block pl:22 mt:10 f:12 fg:#ee2828 {content:'!';abs;top:1/2;left:0;flex;center-content;w:16;h:16;f:12;fg:white;bg:#ee2828;round;translateY(-50%)}::before"
        name="email"
      />
    </div>
    <div class="mt:20">
      <label class="f:bold f:18 fg:white" for="loginPassword">密碼</label>
      <VField
        id="loginPassword"
        class="block w:full h:60 px:26 mt:10 fg:white bg:black b:3|solid|transparent rounded outline:0 b:#f4db0d:focus"
        type="password"
        name="password"
        rules="required|min:6|max:100"
      />
      <ErrorMessage
        class="rel inline-block pl:22 mt:10 f:12 fg:#ee2828 {content:'!';abs;top:1/2;left:0;flex;center-content;w:16;h:16;f:12;fg:white;bg:#ee2828;round;translateY(-50%)}::before"
        name="password"
      />
    </div>
    <button
      class="rel w:full h:60 mt:40 f:bold f:20 bg:linear-gradient(to|right,#fd9d02,#f4db0d) rounded @bounce|1s|infinite:hover"
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
