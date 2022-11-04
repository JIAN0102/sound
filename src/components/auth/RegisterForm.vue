<script setup>
import { ref } from 'vue';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { addDoc } from 'firebase/firestore';
import { auth, usersCollection } from '@/includes/firebase';

const submission = ref(false);
const showAlert = ref(false);
const alertVarient = ref('bg:blue');
const alertMessage = ref('請稍等！正在為您註冊帳號');

async function registerUser({ name, email, password }) {
  submission.value = true;
  showAlert.value = true;
  alertVarient.value = 'bg:blue';
  alertMessage.value = '請稍等！正在為您建立帳號';

  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );

    submission.value = false;
    showAlert.value = true;
    alertVarient.value = 'bg:green';
    alertMessage.value = '註冊帳號成功';

    const docRef = await addDoc(usersCollection, {
      name,
      email,
    });

    console.log(userCredential, docRef);
  } catch (err) {
    const errorCode = err.code;
    if (errorCode === 'auth/email-already-in-use') {
      alertMessage.value = '這個信箱已有人使用，請試試其他信箱。';
    }
    submission.value = false;
    showAlert.value = true;
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
  <VForm @submit="registerUser">
    <div>
      <label class="f:bold f:18 fg:white" for="registerName"
        >該如何稱呼你？</label
      >
      <VField
        id="registerName"
        class="block w:full h:60 px:26 mt:10 fg:white bg:black b:3|solid|transparent rounded outline:0 b:#f4db0d:focus"
        type="text"
        name="name"
        rules="required"
      />
      <ErrorMessage
        v-slot="{ message }"
        class="rel flex ai:center pl:22 mt:10 f:12 fg:#ee2828"
        as="div"
        name="name"
      >
        <span
          class="abs top:1/2 left:0 flex center-content w:16 h:16 f:12 fg:white bg:#ee2828 round translateY(-50%)"
          >!</span
        >
        <p>{{ message }}</p>
      </ErrorMessage>
    </div>
    <div class="mt:20">
      <label class="f:bold f:18 fg:white" for="registerEmail"
        >你的電子郵件是什麼？</label
      >
      <VField
        id="registerEmail"
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
      <label class="f:bold f:18 fg:white" for="registerPassword">密碼</label>
      <VField
        id="registerPassword"
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
    <div class="mt:20">
      <label class="f:bold f:18 fg:white" for="registerConfirmPassword"
        >確認密碼</label
      >
      <VField
        id="registerConfirmPassword"
        class="block w:full h:60 px:26 mt:10 fg:white bg:black b:3|solid|transparent rounded outline:0 b:#f4db0d:focus"
        type="password"
        name="confirmPassword"
        rules="confirmed:@password"
      />
      <ErrorMessage
        class="rel inline-block pl:22 mt:10 f:12 fg:#ee2828 {content:'!';abs;top:1/2;left:0;flex;center-content;w:16;h:16;f:12;fg:white;bg:#ee2828;round;translateY(-50%)}::before"
        name="confirmPassword"
      />
    </div>
    <button
      class="rel w:full h:60 mt:40 f:bold f:20 bg:linear-gradient(to|right,#fd9d02,#f4db0d) rounded @bounce|1.5s|infinite:hover"
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
