<script setup>
import { ref, reactive, onBeforeUnmount } from 'vue';
import { auth, storage, songsCollection } from '@/includes/firebase';
import { addDoc, getDoc } from 'firebase/firestore';
import {
  ref as storageRef,
  uploadBytesResumable,
  getDownloadURL,
} from 'firebase/storage';

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
        await getDoc(songRef);

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
    class="flex center-content h:180 f:bold fg:white bg:black r:20 b:4|solid|transparent {h:320;f:20}@md {bg:#111;b:secondary}:is(:hover,.is-drag-over)"
    :class="{ 'is-drag-over': isDragOver }"
    for="upload"
    @dragend.prevent.stop="isDragOver = false"
    @dragover.prevent.stop="isDragOver = true"
    @dragenter.prevent.stop="isDragOver = true"
    @dragleave.prevent.stop="isDragOver = false"
    @drop.prevent.stop="uploadFile($event)"
  >
    點擊上傳或拖拉檔案至此</label
  >
  <input
    id="upload"
    class="hide"
    type="file"
    multiple
    @change="uploadFile($event)"
  />
  <ul v-for="upload in uploads" :key="upload.name" class="mt:30 mt:20>li~li">
    <li>
      <div
        class="rel h:60 overflow:hidden bg:black b:10|solid|black rounded"
        :class="upload.class"
      >
        <div
          class="rel h:full overflow:hidden bg:#777 rounded ~width|.1s .is-error_{bg:#ee2828} .is-uploaded_{bg:linear-gradient(to|right,primary,secondary)}"
          :style="{ width: `${upload.currentProgress}%` }"
        >
          <div
            class="abs inset:0 bg:linear-gradient(-45deg,white/.1|25%,transparent|25%,transparent|50%,white/.1|50%,white/.1|75%,transparent|75%,transparent) background-size:40|40 @progress|1.5s|linear|infinite .is-error_{bg:linear-gradient(-45deg,black/.1|25%,transparent|25%,transparent|50%,black/.1|50%,black/.1|75%,transparent|75%,transparent)} .is-uploaded_{bg:linear-gradient(-45deg,primary/.5|25%,transparent|25%,transparent|50%,primary/.5|50%,primary/.5|75%,transparent|75%,transparent)}"
          ></div>
        </div>
        <span
          class="abs top:-10 left:-10 p:10|32|10|24 f:14 fg:white bg:black rrb:80"
          >{{ upload.name }}</span
        >
      </div>
    </li>
  </ul>
</template>
