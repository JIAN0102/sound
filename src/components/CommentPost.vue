<script setup>
import {
  ref,
  reactive,
  computed,
  watch,
  onMounted,
  onBeforeUnmount,
} from 'vue';
import { useRoute } from 'vue-router';
import {
  query,
  where,
  orderBy,
  startAfter,
  limit,
  doc,
  getDoc,
  getDocs,
  getCountFromServer,
} from 'firebase/firestore';
import { commentsCollection } from '@/plugins/firebase';
import IconLoading from '@/components/icons/IconLoading.vue';
import IconAdjust from '@/components/icons/IconAdjust.vue';
import CommentPostForm from '@/components/CommentPostForm.vue';
import CommentPostPreview from '@/components/CommentPostPreview.vue';

const route = useRoute();

const isPending = ref(false);
const comments = reactive([]);
const commentSort = ref('descending');
const documentsTotalLength = ref(0);
const limitDocumentRef = ref(null);
const limitLength = ref(6);

const sortedComments = computed(() =>
  comments.slice().sort((a, b) => {
    if (commentSort.value === 'descending') {
      return b.createdAt - a.createdAt;
    }
    return a.createdAt - b.createdAt;
  })
);

function handleScroll() {
  const { scrollTop } = document.documentElement;
  const { innerHeight } = window;
  const documentsOffsetTop = limitDocumentRef.value?.offsetTop;
  const documentsHeight =
    limitDocumentRef.value?.getBoundingClientRect().height;

  const bottomOfDocuments =
    scrollTop + innerHeight - (documentsOffsetTop + documentsHeight) >= -100;

  if (bottomOfDocuments) {
    getComments();
  }
}

async function getComments() {
  if (isPending.value || comments.length >= documentsTotalLength.value) return;

  isPending.value = true;

  let snapshots;

  if (comments.length) {
    const lastDoc = await getDoc(
      doc(commentsCollection, comments[comments.length - 1].docID)
    );
    const q = query(
      commentsCollection,
      where('songID', '==', route.params.id),
      orderBy('createdAt', 'desc'),
      startAfter(lastDoc),
      limit(limitLength.value)
    );
    snapshots = await getDocs(q);
  } else {
    const q = query(
      commentsCollection,
      where('songID', '==', route.params.id),
      orderBy('createdAt', 'desc'),
      limit(limitLength.value)
    );
    snapshots = await getDocs(q);
  }

  setTimeout(() => {
    snapshots.forEach((document) => {
      comments.push({
        ...document.data(),
        docID: document.id,
      });
    });
    isPending.value = false;
  }, 1000);
}

function addComment(document) {
  comments.push({
    ...document.data(),
    docID: document.id,
  });
}

function deleteComment(docID) {
  const index = comments.findIndex((comment) => comment.docID === docID);
  comments.splice(index, 1);
}

async function getDocumentsTotalLength() {
  const q = query(commentsCollection, where('songID', '==', route.params.id));
  const snapshot = await getCountFromServer(q);
  documentsTotalLength.value = snapshot.data().count;
}

watch(comments, () => {
  getDocumentsTotalLength();
});

onMounted(async () => {
  await getDocumentsTotalLength();
  window.addEventListener('scroll', handleScroll);
  getComments();
});

onBeforeUnmount(() => {
  window.removeEventListener('scroll', handleScroll);
});
</script>

<template>
  <div
    class="flex jc:space-between ai:center gap-x:30 fg:white jc:flex-start@md"
  >
    <span>{{ comments.length }} 則留言</span>
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

  <div class="rel mt:20 mt:30@md">
    <CommentPostForm @add-comment="addComment" />
  </div>

  <div ref="limitDocumentRef" class="rel mt:30">
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
    <Transition name="fade">
      <div
        v-show="isPending"
        class="abs bottom:-20 left:1/2 fg:white translate(-50%,100%)"
      >
        <IconLoading :width="40" :height="40" />
      </div>
    </Transition>
  </div>
</template>
