import { ref, reactive, watch, onMounted } from 'vue';
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

  function observerDocuments() {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          getDocuments();
        }
      });
    });
    observer.observe(loadingObserverRef.value);
  }

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
    await getDocuments();
    observerDocuments();
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