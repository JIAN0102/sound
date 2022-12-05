<script setup>
import { onMounted } from 'vue';
import { storeToRefs } from 'pinia';
import { useCommentStore } from '@/stores/comment';
import IconAdjust from '@/components/icons/IconAdjust.vue';
import CommentPostForm from '@/components/CommentPostForm.vue';
import CommentPostPreview from '@/components/CommentPostPreview.vue';

const commentStore = useCommentStore();
const { commentSort, sortedComments } = storeToRefs(commentStore);
const { getComments } = commentStore;

onMounted(() => {
  getComments();
});
</script>

<template>
  <div class="flex jc:space-between ai:center gap-x:20 fg:white">
    <span>{{ sortedComments.length }} 則留言</span>
    <div class="rel flex:1 max-w:200">
      <select
        v-model="commentSort"
        class="block w:full h:60 outline:0 appearance:none fg:black>option"
      >
        <option value="descending">排序依據 (由新到舊)</option>
        <option value="ascending">排序依據 (由舊到新)</option>
      </select>
      <div class="abs top:1/2 right:0 pointer-events:none translateY(-50%)">
        <IconAdjust />
      </div>
    </div>
  </div>

  <div class="rel mt:20">
    <CommentPostForm />
  </div>

  <Transition name="slide">
    <ul v-if="sortedComments.length" class="p:20|30 mt:20 bg:#212121 r:20">
      <TransitionGroup name="slide">
        <CommentPostPreview
          v-for="comment in sortedComments"
          :key="comment.docID"
          :comment="comment"
        />
      </TransitionGroup>
    </ul>
  </Transition>
</template>
