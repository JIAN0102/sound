<script setup>
import { ref, computed } from 'vue';
import { storeToRefs } from 'pinia';
import { doc, deleteDoc } from 'firebase/firestore';
import { commentsCollection } from '@/plugins/firebase';
import { formatDistanceToNow } from 'date-fns';
import { zhTW } from 'date-fns/locale';
import { useUserStore } from '@/stores/user';
import { auth } from '@/plugins/firebase';
import IconLoading from '@/components/icons/IconLoading.vue';
import IconDelete from '@/components/icons/IconDelete.vue';

const emit = defineEmits(['delete-comment']);

const props = defineProps({
  comment: {
    type: Object,
    required: true,
  },
});

const userStore = useUserStore();
const { isLoggedIn } = storeToRefs(userStore);

const isPending = ref(false);

const formattedCreatedAt = computed(() => {
  return formatDistanceToNow(props.comment.createdAt.toDate(), {
    addSuffix: true,
    locale: zhTW,
  });
});

async function handleClick() {
  isPending.value = true;
  await deleteDoc(doc(commentsCollection, props.comment.docID));
  emit('delete-comment', props.comment.docID);
  isPending.value = false;
}
</script>

<template>
  <div class="rel">
    <button
      v-if="isLoggedIn && comment.uid === auth.currentUser.uid"
      class="abs top:0 right:0 fg:white pointer-events:none:disabled"
      type="button"
      :disabled="isPending"
      @click="handleClick"
    >
      <IconLoading v-if="isPending" :width="16" :height="16" />
      <IconDelete v-else :width="16" :height="16" />
    </button>
    <div class="flex ai:center gap-x:8">
      <h3 class="f:bold fg:white lines:1 f:18@md">{{ comment.name }}</h3>
      <span class="f:12 fg:white/.5 white-space:nowrap">
        {{ formattedCreatedAt }}
      </span>
    </div>
    <p class="mt:4 f:14 fg:white/.7 lh:1.75 white-space:pre-wrap">
      {{ comment.content }}
    </p>
  </div>
</template>
