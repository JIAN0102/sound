import { ref, reactive, watch, nextTick, onMounted } from 'vue';
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

export function useLimitDocument(limitLength, collection, collectionWhere) {
  const isPending = ref(false);
  const documents = reactive([]);
  const documentsCount = ref(0);
  const loadingObserverRef = ref(null);

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        observer.unobserve(loadingObserverRef.value);
        getDocuments();
      }
    });
  });

  async function getDocuments() {
    if (isPending.value || documents.length >= documentsCount.value) return;

    isPending.value = true;

    let snapshots;

    if (documents.length) {
      const lastDoc = await getDoc(
        doc(collection, documents[documents.length - 1].docID)
      );
      const q = collectionWhere
        ? query(
            collection,
            where(...collectionWhere),
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
      const q = collectionWhere
        ? query(
            collection,
            where(...collectionWhere),
            orderBy('createdAt', 'desc'),
            limit(limitLength)
          )
        : query(collection, orderBy('createdAt', 'desc'), limit(limitLength));
      snapshots = await getDocs(q);
    }

    setTimeout(async () => {
      snapshots.forEach((document) => {
        documents.push({
          ...document.data(),
          docID: document.id,
        });
      });
      isPending.value = false;
      await nextTick();
      if (loadingObserverRef.value) observer.observe(loadingObserverRef.value);
    }, 1000);
  }

  async function getDocumentsCount() {
    const q = collectionWhere
      ? query(collection, where(...collectionWhere))
      : collection;
    const snapshot = await getCountFromServer(q);
    documentsCount.value = snapshot.data().count;
  }

  function addDocument(document) {
    documents.unshift({
      ...document.data(),
      docID: document.id,
    });
  }

  function editDocument(document) {
    const index = documents.findIndex((doc) => doc.docID === document.docID);
    documents[index] = document;
  }

  function deleteDocument(docID) {
    const index = documents.findIndex((doc) => doc.docID === docID);
    documents.splice(index, 1);
  }

  watch(
    () => documents.length,
    () => {
      getDocumentsCount();
    }
  );

  onMounted(async () => {
    await getDocumentsCount();
    await getDocuments();
  });

  return {
    isPending,
    documents,
    documentsCount,
    loadingObserverRef,
    addDocument,
    editDocument,
    deleteDocument,
  };
}
