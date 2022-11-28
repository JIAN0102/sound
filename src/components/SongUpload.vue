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
import IconUpload from '@/components/icons/IconUpload.vue';

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
          title: file.name.replace(/\.[^/\\.]+$/, ''),
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
    class="flex flex:col center-content gap-y:10 aspect:3/2 fg:white b:2|dashed|#777 r:30 aspect:2/1@xs ~all|.1s {bg:#222;b:white}:is(:hover,.is-drag-over)"
    :class="{ 'is-drag-over': isDragOver }"
    for="upload"
    @dragend.prevent.stop="isDragOver = false"
    @dragover.prevent.stop="isDragOver = true"
    @dragenter.prevent.stop="isDragOver = true"
    @dragleave.prevent.stop="isDragOver = false"
    @drop.prevent.stop="uploadFile"
  >
    <div class="w:32 h:32 {w:40;h:40}@md">
      <IconUpload :width="'100%'" :height="'100%'" />
    </div>
    <h3 class="f:bold lh:1.5 t:center f:20@md">
      拖曳歌曲至此，或
      <span class="fg:primary t:underline cursor:pointer">選擇檔案</span>
      <br />
      <span class="f:14 fg:#777">支援檔案類型：MP3。≤10MB</span>
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
