import { ref, computed } from 'vue';
import { useRoute } from 'vue-router';
import { defineStore } from 'pinia';
import {
  query,
  where,
  doc,
  addDoc,
  getDocs,
  deleteDoc,
} from 'firebase/firestore';
import { auth, commentsCollection } from '@/plugins/firebase';

export const useCommentStore = defineStore('comment', () => {
  const route = useRoute();

  const comments = ref([]);
  const sort = ref('1');
  const sortedComments = computed(() =>
    comments.value.slice().sort((a, b) => {
      if (sort.value === '1') {
        return new Date(b.datePosted) - new Date(a.datePosted);
      }
      return new Date(a.datePosted) - new Date(b.datePosted);
    })
  );

  async function getComments() {
    const q = query(commentsCollection, where('songID', '==', route.params.id));
    const snapshots = await getDocs(q);

    comments.value = [];

    snapshots.forEach((document) => {
      comments.value.push({
        ...document.data(),
        docID: document.id,
      });
    });
  }

  async function addComment(values) {
    const comment = {
      content: values.comment,
      datePosted: new Date().toString(),
      songID: route.params.id,
      name: auth.currentUser.displayName,
      uid: auth.currentUser.uid,
    };

    await addDoc(commentsCollection, comment);
    getComments();
  }

  async function deleteComment(docID) {
    await deleteDoc(doc(commentsCollection, docID));
    getComments();
  }

  return {
    comments,
    sort,
    sortedComments,
    getComments,
    addComment,
    deleteComment,
  };
});
