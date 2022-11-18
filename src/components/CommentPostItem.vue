<script setup>
import { computed } from 'vue';
import { storeToRefs } from 'pinia';
import { formatDistanceToNow } from 'date-fns';
import { zhTW } from 'date-fns/locale';
import { useUserStore } from '@/stores/user';
import { useCommentStore } from '@/stores/comment';
import { auth } from '@/plugins/firebase';

const props = defineProps({
  comment: {
    type: Object,
    required: true,
  },
});

const userStore = useUserStore();
const { isLoggedIn } = storeToRefs(userStore);

const commentStore = useCommentStore();
const { deleteComment } = commentStore;

const formattedTime = computed(() => {
  return formatDistanceToNow(props.comment.createdAt.toDate(), {
    addSuffix: true,
    locale: zhTW,
  });
});
</script>

<template>
  <li class="rel py:15">
    <button
      v-if="isLoggedIn && comment.uid === auth.currentUser.uid"
      class="abs top:15 right:0 f:12 fg:white"
      type="button"
      @click.prevent="deleteComment(comment.docID)"
    >
      刪除
    </button>
    <div class="flex ai:flex-end gap-x:8">
      <h3 class="f:bold fg:white f:18@md">{{ comment.name }}</h3>
      <span class="f:12 fg:#777">
        {{ formattedTime }}
      </span>
    </div>
    <div class="mt:10 f:14 fg:white lh:1.75 f:16@md">
      <p>{{ comment.content }}</p>
    </div>
  </li>
</template>
