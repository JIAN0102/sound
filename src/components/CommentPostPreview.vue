<script setup>
import { ref, computed } from 'vue';
import { storeToRefs } from 'pinia';
import { formatDistanceToNow } from 'date-fns';
import { zhTW } from 'date-fns/locale';
import { useUserStore } from '@/stores/user';
import { useCommentStore } from '@/stores/comment';
import { auth } from '@/plugins/firebase';
import IconLoading from '@/components/icons/IconLoading.vue';
import IconDelete from '@/components/icons/IconDelete.vue';

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

const isPending = ref(false);

const formattedCreatedAt = computed(() => {
  return formatDistanceToNow(props.comment.createdAt.toDate(), {
    addSuffix: true,
    locale: zhTW,
  });
});

async function handleClick(docID) {
  isPending.value = true;
  await deleteComment(docID);
  isPending.value = false;
}
</script>

<template>
  <li class="rel py:15">
    <button
      v-if="isLoggedIn && comment.uid === auth.currentUser.uid"
      class="abs top:15 right:0 fg:white pointer-events:none:disabled"
      type="button"
      :disabled="isPending"
      @click="handleClick(comment.docID)"
    >
      <IconLoading v-if="isPending" :width="16" :height="16" />
      <IconDelete v-else :width="16" :height="16" />
    </button>
    <div class="flex ai:flex-end gap-x:8">
      <h3 class="f:bold fg:white f:18@md">{{ comment.name }}</h3>
      <span class="f:12 fg:#8b8b8b">
        {{ formattedCreatedAt }}
      </span>
    </div>
    <div class="mt:10 f:14 fg:white lh:1.75 f:16@md">
      <p class="white-space:pre-wrap">{{ comment.content }}</p>
    </div>
  </li>
</template>
