<script setup>
import { ref, reactive, computed } from 'vue';
import { useRoute } from 'vue-router';
import { storeToRefs } from 'pinia';
import { useUserStore } from '@/stores/user';
import { useModalStore } from '@/stores/modal';
import { addDoc, getDoc, serverTimestamp } from 'firebase/firestore';
import { auth, commentsCollection } from '@/plugins/firebase';
import IconLoading from '@/components/icons/IconLoading.vue';

const route = useRoute();

const emit = defineEmits(['add-comment']);

const userStore = useUserStore();
const { isLoggedIn } = storeToRefs(userStore);

const modalStore = useModalStore();
const { toggleModal } = modalStore;

const schema = reactive({
  comment: 'required',
});
const submission = ref(false);

const greeting = computed(() =>
  auth.currentUser
    ? `哈囉${auth.currentUser.displayName}，發表你對這首歌的感受吧!`
    : '登入會員才能發表評論'
);

async function onSubmit(values, { resetForm }) {
  submission.value = true;

  const comment = {
    content: values.comment,
    createdAt: serverTimestamp(),
    songID: route.params.id,
    name: auth.currentUser.displayName,
    uid: auth.currentUser.uid,
  };

  try {
    const commentRef = await addDoc(commentsCollection, comment);
    const commentSnapshot = await getDoc(commentRef);
    submission.value = false;
    resetForm();
    emit('add-comment', commentSnapshot);
  } catch (error) {
    console.log(error);
  }
}
</script>

<template>
  <VForm :validation-schema="schema" @submit="onSubmit">
    <fieldset
      :disabled="submission"
      :class="{ 'pointer-events:none': submission }"
    >
      <VField v-slot="{ field, meta }" name="comment">
        <textarea
          v-bind="field"
          class="block w:full h:200 p:20|30 fg:white lh:1.75 bg:#212121 b:3|solid|transparent r:30 outline:0 resize:none b:#696969:focus fg:white/.7::placeholder"
          type="text"
          :placeholder="greeting"
          :disabled="!isLoggedIn || submission"
        ></textarea>
        <div
          v-if="isLoggedIn"
          class="rel flex w:200 h:60 mt:-30 mx:auto overflow:hidden bg:#212121 b:3|solid|#030303 rounded {content:'';abs;top:1/2;left:1/2;w:3;h:30;bg:#030303;translate(-50%,-50%)}::before"
        >
          <button
            class="flex center-content w:1/2 fg:white bg:#383838:hover@md"
            type="submit"
            :disabled="submission || !meta.valid"
          >
            <IconLoading v-if="submission" />
            <template v-else>留言</template>
          </button>
          <button
            class="flex center-content w:1/2 fg:white bg:#383838:hover@md"
            type="reset"
            :disabled="submission || !meta.valid"
          >
            取消
          </button>
        </div>
        <button
          v-else
          class="rel block w:160 h:60 mt:-30 mx:auto fg:white bg:#212121 b:3|solid|#030303 rounded bg:#383838:hover"
          type="button"
          @click="toggleModal"
        >
          登入 / 註冊
        </button>
      </VField>
    </fieldset>
  </VForm>
</template>
