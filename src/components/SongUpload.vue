<script setup>
import { ref, reactive, onBeforeUnmount } from 'vue';
import { v4 as uuidv4 } from 'uuid';
import { addDoc, getDoc, serverTimestamp } from 'firebase/firestore';
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
const uploadRef = ref(null);

function uploadFile(event) {
  isDragOver.value = false;

  const files = event.dataTransfer
    ? [...event.dataTransfer.files]
    : [...event.target.files];

  uploadRef.value.value = '';

  files.forEach((file) => {
    if (file.type !== 'audio/mpeg') return;

    const songsRef = storageRef(storage, `songs/${uuidv4()}`);
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
          createdAt: serverTimestamp(),
          uuid: uploadTask.snapshot.ref.name,
          uid: auth.currentUser.uid,
          displayName: auth.currentUser.displayName,
          modifiedName: file.name.replace(/\.[^/\\.]+$/, ''),
          genre: '無',
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
    class="flex flex:col center-content gap-y:10 aspect:3/2 b:2|dashed|#555 r:30 aspect:2/1@xs f:20@md ~all|.1s {bg:#222;b:white}:is(:hover,.is-drag-over)"
    :class="{ 'is-drag-over': isDragOver }"
    for="upload"
    @dragend.prevent.stop="isDragOver = false"
    @dragover.prevent.stop="isDragOver = true"
    @dragenter.prevent.stop="isDragOver = true"
    @dragleave.prevent.stop="isDragOver = false"
    @drop.prevent.stop="uploadFile"
  >
    <img class="w:32 w:40@md" src="/assets/img/icon-upload.svg" alt="" />
    <h3 class="f:bold fg:white t:center">
      點擊上傳或拖拉檔案至此<br />
      <span class="f:14 fg:#777">限 10MB 以下的 mp3 檔案</span>
    </h3>
  </label>
  <input
    id="upload"
    ref="uploadRef"
    class="hide"
    type="file"
    multiple
    @change="uploadFile"
  />
  <ul v-if="uploads.length" class="mt:20 mt:30@md mt:20>li~li">
    <SongUploadItem
      v-for="upload in uploads"
      :key="upload.name"
      :upload="upload"
    />
  </ul>
</template>
