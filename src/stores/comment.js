import { ref, computed } from 'vue';
import { useRoute } from 'vue-router';
import { defineStore } from 'pinia';
import { query, where, doc, getDocs, deleteDoc } from 'firebase/firestore';
import { commentsCollection } from '@/plugins/firebase';

export const useCommentStore = defineStore('comment', () => {
  const route = useRoute();

  const comments = ref([]);
  const commentSort = ref('1');
  const sortedComments = computed(() =>
    comments.value.slice().sort((a, b) => {
      if (commentSort.value === '1') {
        return new Date(b.datePosted) - new Date(a.datePosted);
      }
      return new Date(a.datePosted) - new Date(b.datePosted);
    })
  );

  function addComment(document) {
    comments.value.push({
      ...document.data(),
      docID: document.id,
    });
  }

  async function getComments() {
    const q = query(commentsCollection, where('songID', '==', route.params.id));
    const snapshots = await getDocs(q);

    comments.value = [];
    snapshots.forEach(addComment);
  }

  async function deleteComment(docID) {
    await deleteDoc(doc(commentsCollection, docID));

    const index = comments.value.findIndex(
      (comment) => comment.docID === docID
    );
    comments.value.splice(index, 1);
  }

  return {
    comments,
    commentSort,
    sortedComments,
    addComment,
    getComments,
    deleteComment,
  };
});
