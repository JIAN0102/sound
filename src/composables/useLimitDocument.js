import { ref, reactive, onMounted, onBeforeUnmount } from 'vue';
import {
  query,
  orderBy,
  startAfter,
  limit,
  doc,
  getDoc,
  getDocs,
  getCountFromServer,
} from 'firebase/firestore';

export function useLimitDocument(collection) {
  const isPending = ref(false);
  const documents = reactive([]);
  const documentsTotalLength = ref(0);
  const limitDocumentRef = ref(null);
  const perPage = ref(12);

  function handleScroll() {
    const { scrollTop } = document.documentElement;
    const { innerHeight } = window;
    const documentsOffsetTop = limitDocumentRef.value?.offsetTop;
    const documentsHeight =
      limitDocumentRef.value?.getBoundingClientRect().height;

    const bottomOfDocuments =
      scrollTop + innerHeight - (documentsOffsetTop + documentsHeight) >= -100;

    if (bottomOfDocuments) {
      getDocuments();
    }
  }

  async function getDocuments() {
    if (isPending.value || documents.length >= documentsTotalLength.value)
      return;

    isPending.value = true;

    let snapshots;

    if (documents.length) {
      const lastDoc = await getDoc(
        doc(collection, documents[documents.length - 1].docID)
      );
      const q = query(
        collection,
        orderBy('createdAt', 'desc'),
        startAfter(lastDoc),
        limit(perPage.value)
      );
      snapshots = await getDocs(q);
    } else {
      const q = query(
        collection,
        orderBy('createdAt', 'desc'),
        limit(perPage.value)
      );
      snapshots = await getDocs(q);
    }

    setTimeout(() => {
      snapshots.forEach((document) => {
        documents.push({
          ...document.data(),
          docID: document.id,
        });
      });
      isPending.value = false;
    }, 1000);
  }

  onMounted(async () => {
    const snapshot = await getCountFromServer(collection);
    documentsTotalLength.value = snapshot.data().count;

    window.addEventListener('scroll', handleScroll);
    getDocuments();
  });

  onBeforeUnmount(() => {
    window.removeEventListener('scroll', handleScroll);
  });

  return {
    isPending,
    documents,
    limitDocumentRef,
  };
}
