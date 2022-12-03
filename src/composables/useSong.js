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
import { songsCollection } from '@/plugins/firebase';

export function useSong() {
  const isPending = ref(false);
  const songs = reactive([]);
  const songsTotalLength = ref(0);
  const songListRef = ref(null);
  const perPage = ref(9);

  function handleScroll() {
    const { scrollTop } = document.documentElement;
    const { innerHeight } = window;
    const songListOffsetTop = songListRef.value?.offsetTop;
    const songListHeight = songListRef.value?.getBoundingClientRect().height;

    const bottomOfSongList =
      scrollTop + innerHeight - (songListOffsetTop + songListHeight) >= -100;

    if (bottomOfSongList) {
      getSongs();
    }
  }

  async function getSongs() {
    if (isPending.value || songs.length >= songsTotalLength.value) return;

    isPending.value = true;

    let snapshots;

    if (songs.length) {
      const lastDoc = await getDoc(
        doc(songsCollection, songs[songs.length - 1].docID)
      );
      const q = query(
        songsCollection,
        orderBy('title'),
        startAfter(lastDoc),
        limit(perPage.value)
      );
      snapshots = await getDocs(q);
    } else {
      const q = query(songsCollection, orderBy('title'), limit(perPage.value));
      snapshots = await getDocs(q);
    }

    setTimeout(() => {
      snapshots.forEach((document) => {
        songs.push({
          ...document.data(),
          docID: document.id,
        });
      });

      isPending.value = false;
    }, 1000);
  }

  onMounted(async () => {
    const snapshot = await getCountFromServer(songsCollection);
    songsTotalLength.value = snapshot.data().count;

    window.addEventListener('scroll', handleScroll);
    getSongs();
  });

  onBeforeUnmount(() => {
    window.removeEventListener('scroll', handleScroll);
  });

  return {
    isPending,
    songs,
    songListRef,
  };
}
