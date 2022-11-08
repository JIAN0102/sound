<script setup>
import { ref, reactive, onBeforeUnmount } from 'vue';
import { auth, storage, songsCollection } from '@/plugins/firebase';
import { addDoc, getDoc } from 'firebase/firestore';
import {
  ref as storageRef,
  uploadBytesResumable,
  getDownloadURL,
} from 'firebase/storage';

const emit = defineEmits(['upload-song']);

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
          genre: '',
          commentCount: 0,
        };

        song.url = await getDownloadURL(uploadTask.snapshot.ref);
        const songRef = await addDoc(songsCollection, song);
        const songSnapshot = await getDoc(songRef);

        emit('upload-song', songSnapshot);

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
    <li v-for="upload in uploads" :key="upload.name" :class="upload.class">
      <span class="f:14 fg:white f:16@md">{{ upload.name }}</span>
      <div
        class="rel h:40 mt:8 overflow:hidden bg:#555 background-size:40|40 rounded @progress|1.5s|linear|infinite rounded ~width|.1s"
      >
        <div
          class="abs top:0 left:0 h:full overflow:hidden bg:#777 rounded ~width|.1s .is-error_{bg:#ee2828} .is-uploaded_{bg:linear-gradient(to|right,primary,secondary)}"
          :style="{ width: `${upload.currentProgress}%` }"
        >
          <div
            class="abs inset:0 bg:url('assets/img/progress-arrow.svg') background-size:50|40 @progress|1.5s|linear|infinite"
          ></div>
        </div>
        <div
          class="abs top:1/2 left:10 w:20 h:20 bg:white round translateY(-50%)"
        ></div>
      </div>
    </li>
  </ul>
</template>
