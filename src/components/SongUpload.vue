<script setup>
import { reactive, onUnmounted } from 'vue';
import { addDoc, getDoc, serverTimestamp } from 'firebase/firestore';
import {
  ref as storageRef,
  uploadBytesResumable,
  getDownloadURL,
} from 'firebase/storage';
import { auth, storage, songsCollection } from '@/plugins/firebase';
import emitter from '@/plugins/mitt';
import { v4 as uuidv4 } from 'uuid';
import SongUploadFile from '@/components/SongUploadFile.vue';
import SongUploadPreview from '@/components/SongUploadPreview.vue';

const uploads = reactive([]);

function uploadFile(files) {
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
          description: '',
          tags: [],
          coverUrl: '',
          genre: '無',
        };
        try {
          song.url = await getDownloadURL(uploadTask.snapshot.ref);
          const songRef = await addDoc(songsCollection, song);
          const songSnapshot = await getDoc(songRef);

          uploads[uploadIndex].class = 'is-uploaded';
          emitter.emit('addSong', songSnapshot);
        } catch (error) {
          console.log(error);
        }
      }
    );
  });
}

onUnmounted(() => {
  uploads.forEach((upload) => {
    upload.uploadTask.cancel();
  });
});
</script>

<template>
  <div class="mt:20 mt:30@md">
    <SongUploadFile @upload-file="uploadFile" />
    <ul v-if="uploads.length" class="mt:20 mt:30@md mt:20>li~li">
      <li v-for="upload in uploads" :key="upload.name">
        <SongUploadPreview :upload="upload" />
      </li>
    </ul>
  </div>
</template>
