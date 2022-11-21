<script setup>
import { ref, computed, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { storeToRefs } from 'pinia';
import { addDoc, getDoc, serverTimestamp } from 'firebase/firestore';
import { auth, commentsCollection } from '@/plugins/firebase';
import { useUserStore } from '@/stores/user';
import { useCommentStore } from '@/stores/comment';
import { useModalStore } from '@/stores/modal';
import CommentPostItem from '@/components/CommentPostItem.vue';

const route = useRoute();

const userStore = useUserStore();
const { isLoggedIn } = storeToRefs(userStore);

const commentStore = useCommentStore();
const { commentSort, sortedComments } = storeToRefs(commentStore);
const { getComments, addComment } = commentStore;

const modalStore = useModalStore();
const { toggleModal } = modalStore;

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
  const commentRef = await addDoc(commentsCollection, comment);
  const commentSnapshot = await getDoc(commentRef);

  await addComment(commentSnapshot);

  submission.value = false;

  resetForm();
}

onMounted(() => {
  getComments();
});
</script>

<template>
  <div class="flex ai:center gap-x:20">
    <span class="fg:white">{{ sortedComments.length }} 則留言</span>
    <div class="flex:1">
      <select
        v-model="commentSort"
        class="block w:full h:60 px:30 fg:white bg:black b:3|solid|transparent rounded outline:0 appearance:none b:#777:focus"
      >
        <option value="descending">排序依據 (由新到舊)</option>
        <option value="ascending">排序依據 (由舊到新)</option>
      </select>
    </div>
  </div>
  <div class="rel mt:20">
    <VForm @submit="onSubmit">
      <VField
        class="block w:full h:200 p:30 fg:white bg:black b:3|solid|transparent r:30 outline:0 resize:none b:#777:focus fg:#777::placeholder"
        :placeholder="greeting"
        as="textarea"
        name="comment"
        rules="required"
        :disabled="!isLoggedIn"
      />
      <div
        v-if="isLoggedIn"
        class="rel flex w:240 h:60 mt:-30 mx:auto overflow:hidden bg:black b:3|solid|#333 rounded {content:'';abs;top:1/2;left:1/2;w:3;h:30;bg:#333;translate(-50%,-50%)}::before"
      >
        <button
          class="w:1/2 fg:white bg:white/.1:hover"
          type="submit"
          :disabled="submission"
        >
          留言
        </button>
        <button
          class="w:1/2 fg:white bg:white/.1:hover"
          type="reset"
          :disabled="submission"
        >
          取消
        </button>
      </div>
      <button
        v-else
        class="block w:160 h:60 mt:-30 mx:auto fg:white bg:black b:3|solid|#333 rounded"
        type="button"
        @click.prevent="toggleModal"
      >
        登入 / 註冊
      </button>
    </VForm>
  </div>
  <ul v-if="sortedComments.length" class="p:20|30 mt:20 bg:black r:30">
    <CommentPostItem
      v-for="comment in sortedComments"
      :key="comment.docID"
      :comment="comment"
    />
  </ul>
</template>
