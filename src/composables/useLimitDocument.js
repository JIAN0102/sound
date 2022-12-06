import { ref, reactive, watch, onMounted, onBeforeUnmount } from 'vue';
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

export function useLimitDocument(limitLength, collection, collectionQuery) {
  const isPending = ref(false);
  const documents = reactive([]);
  const documentsCount = ref(0);
  const limitDocumentRef = ref(null);

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
    if (isPending.value || documents.length >= documentsCount.value) return;

    isPending.value = true;

    let snapshots;

    if (documents.length) {
      const lastDoc = await getDoc(
        doc(collection, documents[documents.length - 1].docID)
      );
      const q = collectionQuery
        ? query(
            collection,
            collectionQuery,
            orderBy('createdAt', 'desc'),
            startAfter(lastDoc),
            limit(limitLength)
          )
        : query(
            collection,
            orderBy('createdAt', 'desc'),
            startAfter(lastDoc),
            limit(limitLength)
          );
      snapshots = await getDocs(q);
    } else {
      const q = collectionQuery
        ? query(
            collection,
            collectionQuery,
            orderBy('createdAt', 'desc'),
            limit(limitLength)
          )
        : query(collection, orderBy('createdAt', 'desc'), limit(limitLength));
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

  async function getDocumentsCount() {
    const q = collectionQuery ? query(collection, collectionQuery) : collection;
    const snapshot = await getCountFromServer(q);
    documentsCount.value = snapshot.data().count;
  }

  function addDocument(document) {
    documents.unshift({
      ...document.data(),
      docID: document.id,
    });
  }

  function editDocument(values) {
    const index = documents.findIndex((doc) => doc.docID === values.docID);
    documents[index] = values;
  }

  function deleteDocument(docID) {
    const index = documents.findIndex((doc) => doc.docID === docID);
    documents.splice(index, 1);
  }

  watch(documents, () => {
    getDocumentsCount();
  });

  onMounted(async () => {
    await getDocumentsCount();
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
    addDocument,
    editDocument,
    deleteDocument,
  };
}
