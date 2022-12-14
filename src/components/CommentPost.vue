<script setup>
import { ref, computed } from 'vue';
import { useRoute } from 'vue-router';
import { commentsCollection } from '@/plugins/firebase';
import { useLimitDocument } from '@/composables/useLimitDocument';
import IconAdjust from '@/components/icons/IconAdjust.vue';
import BaseLoading from '@/components/BaseLoading.vue';
import CommentPostForm from '@/components/CommentPostForm.vue';
import CommentPostPreview from '@/components/CommentPostPreview.vue';

const route = useRoute();

const collectionWhere = ['songID', '==', route.params.id];

const {
  isPending,
  documents: comments,
  documentsCount: commentsCount,
  loadingObserverRef,
  addDocument: addComment,
  deleteDocument: deleteComment,
} = useLimitDocument(6, commentsCollection, collectionWhere);

const commentSort = ref('descending');

const sortedComments = computed(() =>
  comments.slice().sort((a, b) => {
    if (commentSort.value === 'descending') {
      return;
    }
    return a.createdAt - b.createdAt;
  })
);
</script>

<template>
  <div
    class="flex jc:space-between ai:center gap-x:30 mt:60 fg:white {jc:flex-start;mt:40}@md"
  >
    <span>{{ commentsCount }} 則留言</span>
    <div class="rel">
      <select
        v-model="commentSort"
        class="block w:180 h:40 outline:0 appearance:none fg:black>option"
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
    <CommentPostForm @add-comment="addComment" />
  </div>

  <div class="rel mt:30">
    <ul class="mt:30>li~li">
      <TransitionGroup name="fade">
        <li v-for="comment in sortedComments" :key="comment.docID">
          <CommentPostPreview
            :comment="comment"
            @delete-comment="deleteComment"
          />
        </li>
      </TransitionGroup>
    </ul>
    <div
      ref="loadingObserverRef"
      class="abs bottom:-20 left:1/2 fg:white translate(-50%,100%) opacity:0 invisible {opacity:1;visible}.is-active"
      :class="{ 'is-active': isPending }"
    >
      <BaseLoading />
    </div>
  </div>
</template>
