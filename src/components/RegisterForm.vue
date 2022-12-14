<script setup>
import { ref, reactive } from 'vue';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { auth, usersCollection } from '@/plugins/firebase';
import IconLoading from '@/components/icons/IconLoading.vue';
import IconUser from '@/components/icons/IconUser.vue';
import IconAlert from '@/components/icons/IconAlert.vue';
import IconCheck from '@/components/icons/IconCheck.vue';

defineEmits(['change-type']);

const schema = reactive({
  name: 'required',
  email: 'required|email',
  password: 'required|min:6|max:100',
  confirmPassword: 'confirmed:@password',
});
const submission = ref(false);
const errorCodeMessage = ref('');

async function onSubmit({ name, email, password }) {
  submission.value = true;
  errorCodeMessage.value = '';

  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const userRef = doc(usersCollection, userCredential.user.uid);
    await setDoc(userRef, {
      name,
      email,
    });
    await updateProfile(userCredential.user, {
      displayName: name,
    });
    window.location.reload();
  } catch (error) {
    const errorCode = error.code;
    if (errorCode === 'auth/email-already-in-use') {
      errorCodeMessage.value = '這個電子郵件已經有人使用，請試試其他電子郵件。';
    }
  }

  submission.value = false;
}
</script>

<template>
  <div
    v-if="errorCodeMessage"
    class="flex center-content gap-x:5 mb:20 f:14 fg:danger"
  >
    <IconAlert />
    {{ errorCodeMessage }}
  </div>

  <VForm :validation-schema="schema" @submit="onSubmit">
    <fieldset
      :disabled="submission"
      :class="{ 'pointer-events:none': submission }"
    >
      <div>
        <label class="f:bold fg:white f:18@md" for="registerName"
          >該如何稱呼你？</label
        >
        <VField v-slot="{ field, errorMessage, meta }" name="name" label="姓名">
          <div class="rel">
            <input
              v-bind="field"
              id="registerName"
              class="block w:full h:60 pl:24 pr:48 mt:8 fg:white bg:#030303 b:3|solid|transparent rounded outline:0 b:#696969:focus b:danger!.is-invalid"
              :class="{ 'is-invalid': !meta.valid && meta.touched }"
              type="text"
            />
            <div
              v-if="!meta.valid && meta.touched"
              class="abs top:1/2 right:20 fg:danger translateY(-50%)"
            >
              <IconAlert />
            </div>
            <div
              v-if="meta.valid && meta.touched && meta.dirty"
              class="abs top:1/2 right:20 fg:primary translateY(-50%)"
            >
              <IconCheck />
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
        <label class="f:bold fg:white f:18@md" for="registerEmail"
          >你的電子郵件是什麼？</label
        >
        <VField
          v-slot="{ field, errorMessage, meta }"
          name="email"
          label="電子郵件"
        >
          <div class="rel">
            <input
              v-bind="field"
              id="registerEmail"
              class="block w:full h:60 pl:24 pr:48 mt:8 fg:white bg:#030303 b:3|solid|transparent rounded outline:0 b:#696969:focus b:danger!.is-invalid"
              :class="{ 'is-invalid': !meta.valid && meta.touched }"
              type="email"
            />
            <div
              v-if="!meta.valid && meta.touched"
              class="abs top:1/2 right:20 fg:danger translateY(-50%)"
            >
              <IconAlert />
            </div>
            <div
              v-if="meta.valid && meta.touched && meta.dirty"
              class="abs top:1/2 right:20 fg:primary translateY(-50%)"
            >
              <IconCheck />
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
        <label class="f:bold fg:white f:18@md" for="registerPassword"
          >密碼</label
        >
        <VField
          v-slot="{ field, errorMessage, meta }"
          name="password"
          label="密碼"
        >
          <div class="rel">
            <input
              v-bind="field"
              id="registerPassword"
              class="block w:full h:60 pl:24 pr:48 mt:8 fg:white bg:#030303 b:3|solid|transparent rounded outline:0 b:#696969:focus b:danger!.is-invalid"
              :class="{ 'is-invalid': !meta.valid && meta.touched }"
              type="password"
            />
            <div
              v-if="!meta.valid && meta.touched"
              class="abs top:1/2 right:20 fg:danger translateY(-50%)"
            >
              <IconAlert />
            </div>
            <div
              v-if="meta.valid && meta.touched && meta.dirty"
              class="abs top:1/2 right:20 fg:primary translateY(-50%)"
            >
              <IconCheck />
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
        <label class="f:bold fg:white f:18@md" for="registerConfirmPassword"
          >確認密碼</label
        >
        <VField
          v-slot="{ field, errorMessage, meta }"
          name="confirmPassword"
          label="密碼"
        >
          <div class="rel">
            <input
              v-bind="field"
              id="registerConfirmPassword"
              class="block w:full h:60 pl:24 pr:48 mt:8 fg:white bg:#030303 b:3|solid|transparent rounded outline:0 b:#696969:focus b:danger!.is-invalid"
              :class="{ 'is-invalid': !meta.valid && meta.touched }"
              type="password"
            />
            <div
              v-if="!meta.valid && meta.touched"
              class="abs top:1/2 right:20 fg:danger translateY(-50%)"
            >
              <IconAlert />
            </div>
            <div
              v-if="meta.valid && meta.touched && meta.dirty"
              class="abs top:1/2 right:20 fg:primary translateY(-50%)"
            >
              <IconCheck />
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
      <button class="group rel w:full mt:40 bg:primary rounded" type="submit">
        <div
          class="abs inset:0 rounded opacity:0 @background-gradient|2s|linear|infinite ~opacity|.3s .group:hover_{opacity:1}@md"
        ></div>
        <div class="rel flex center-content h:60">
          <div
            class="abs top:1/2 left:10 flex center-content w:40 h:40 fg:white bg:#030303 round translateY(-50%)"
          >
            <IconLoading v-if="submission" :width="20" :height="20" />
            <IconUser v-else :width="20" :height="20" />
          </div>
          <span class="f:bold f:18">註冊</span>
        </div>
      </button>
    </fieldset>
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
