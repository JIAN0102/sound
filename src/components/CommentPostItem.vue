<script setup>
import { useCommentStore } from '@/stores/comment';

defineProps({
  comment: {
    type: Object,
    required: true,
  },
});

const commentStore = useCommentStore();
const { deleteComment } = commentStore;
</script>

<template>
  <li class="rel p:30 bg:black r:30">
    <button
      class="abs top:20 right:20 f:12 fg:white"
      type="button"
      @click="deleteComment(comment.docID)"
    >
      刪除
    </button>
    <div class="flex ai:flex-end gap-x:8">
      <h3 class="f:bold fg:white f:18@md">{{ comment.name }}</h3>
      <span class="f:12 fg:#777 f:14@md">
        {{ comment.datePosted }}
      </span>
    </div>
    <div class="mt:20 f:14 fg:white lh:1.75 f:16@md">
      <p>{{ comment.content }}</p>
    </div>
  </li>
</template>
