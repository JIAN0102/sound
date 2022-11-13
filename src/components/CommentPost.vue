<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { storeToRefs } from 'pinia';
import { addDoc, getDoc } from 'firebase/firestore';
import { auth, commentsCollection } from '@/plugins/firebase';
import { useUserStore } from '@/stores/user';
import { useCommentStore } from '@/stores/comment';
import CommentPostItem from '@/components/CommentPostItem.vue';

const route = useRoute();

const userStore = useUserStore();
const { isLoggedIn } = storeToRefs(userStore);

const commentStore = useCommentStore();
const { commentSort, sortedComments } = storeToRefs(commentStore);
const { getComments, addComment } = commentStore;

const submission = ref(false);

async function onSubmit(values, { resetForm }) {
  submission.value = true;

  const comment = {
    content: values.comment,
    datePosted: new Date().toString(),
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

onMounted(async () => {
  await getComments();
});
</script>

<template>
  <div class="flex ai:center gap-x:20">
    <span class="f:bold fg:white f:18@md"
      >{{ sortedComments.length }} 則留言</span
    >
    <div class="flex:1">
      <select
        v-model="commentSort"
        class="block w:full h:60 px:30 fg:white bg:black rounded outline:0 appearance:none b:#777:focus"
      >
        <option value="1">排序依據 (由新到舊)</option>
        <option value="2">排序依據 (由舊到新)</option>
      </select>
    </div>
  </div>
  <div class="mt:20">
    <VForm v-if="isLoggedIn" class="rel" @submit="onSubmit">
      <VField
        class="block w:full h:200 p:30 fg:white bg:black r:30 outline:0 resize:none b:#777:focus fg:#777::placeholder"
        placeholder="發表你對這首歌的感受吧！"
        as="textarea"
        name="comment"
        rules="required"
      />
      <ErrorMessage
        v-slot="{ message }"
        class="abs bottom:-8 left:0 flex ai:center gap-x:6 translateY(100%)"
        as="div"
        name="comment"
      >
        <span
          class="flex center-content w:16 h:16 f:12 fg:white bg:danger round"
          >!</span
        >
        <p class="f:13 fg:danger">{{ message }}</p>
      </ErrorMessage>
      <div
        class="abs bottom:0 left:1/2 flex w:240 h:60 overflow:hidden bg:black b:3|solid|#333 rounded translate(-50%,50%) {content:'';abs;top:1/2;left:1/2;w:3;h:30;bg:#333;translate(-50%,-50%)}::before"
      >
        <button
          class="flex center-content w:1/2 h:full fg:white bg:white/.1:hover"
          type="submit"
          :disabled="submission"
        >
          送出
        </button>
        <button
          class="flex center-content w:1/2 h:full fg:white bg:white/.1:hover"
          type="reset"
          :disabled="submission"
        >
          清空
        </button>
      </div>
    </VForm>
    <div v-else class="fg:white">登入會員才能發表評論</div>
  </div>
  <ul class="mt:50 mt:20>li~li">
    <CommentPostItem
      v-for="comment in sortedComments"
      :key="comment.docID"
      :comment="comment"
    />
  </ul>
</template>
