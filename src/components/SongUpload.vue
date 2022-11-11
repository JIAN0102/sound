<script setup>
import { ref, reactive, onBeforeUnmount } from 'vue';
import { addDoc, getDoc } from 'firebase/firestore';
import {
  ref as storageRef,
  uploadBytesResumable,
  getDownloadURL,
} from 'firebase/storage';
import { auth, storage, songsCollection } from '@/plugins/firebase';
import { useSongStore } from '@/stores/song';
import SongUploadItem from '@/components/SongUploadItem.vue';

const songStore = useSongStore();
const { addSong } = songStore;

const isDragOver = ref(false);
const uploads = reactive([]);

function uploadFile($event) {
  isDragOver.value = false;

  const files = $event.dataTransfer
    ? [...$event.dataTransfer.files]
    : [...$event.target.files];

  files.forEach((file) => {
    if (file.type !== 'audio/mpeg') return;

    const songsRef = storageRef(storage, `songs/${file.name}`);
    const uploadTask = uploadBytesResumable(songsRef, file);
    const uploadIndex =
      uploads.push({
        uploadTask,
        currentProgress: 0,
        name: file.name,
      }) - 1;

    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        uploads[uploadIndex].currentProgress = progress;
      },
      () => {
        uploads[uploadIndex].class = 'is-error';
      },
      async () => {
        const song = {
          uid: auth.currentUser.uid,
          displayName: auth.currentUser.displayName,
          originalName: uploadTask.snapshot.ref.name,
          modifiedName: uploadTask.snapshot.ref.name,
          genre: '無',
          commentCount: 0,
        };
        song.url = await getDownloadURL(uploadTask.snapshot.ref);
        const songRef = await addDoc(songsCollection, song);
        const songSnapshot = await getDoc(songRef);

        addSong(songSnapshot);

        uploads[uploadIndex].class = 'is-uploaded';
      }
    );
  });
}

onBeforeUnmount(() => {
  uploads.forEach((upload) => {
    upload.uploadTask.cancel();
  });
});
</script>

<template>
  <label
    class="flex center-content aspect:3/2 f:bold fg:white bg:black r:30 b:4|solid|transparent aspect:2/1@xs f:20@md {bg:#222;b:secondary}:is(:hover,.is-drag-over)"
    :class="{ 'is-drag-over': isDragOver }"
    for="upload"
    @dragend.prevent.stop="isDragOver = false"
    @dragover.prevent.stop="isDragOver = true"
    @dragenter.prevent.stop="isDragOver = true"
    @dragleave.prevent.stop="isDragOver = false"
    @drop.prevent.stop="uploadFile($event)"
  >
    點擊上傳或拖拉檔案至此
  </label>
  <input
    id="upload"
    class="hide"
    type="file"
    multiple
    @change="uploadFile($event)"
  />
  <ul v-if="uploads.length" class="mt:20 mt:30@md mt:20>li~li">
    <SongUploadItem
      v-for="upload in uploads"
      :key="upload.name"
      :upload="upload"
    />
  </ul>
</template>
