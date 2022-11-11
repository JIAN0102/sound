<script setup>
import { ref, reactive } from 'vue';
import { storage, songsCollection } from '@/plugins/firebase';
import { doc, updateDoc, deleteDoc } from 'firebase/firestore';
import { ref as storageRef, deleteObject } from 'firebase/storage';

const props = defineProps({
  song: {
    type: Object,
    required: true,
  },
});

const emit = defineEmits(['edit-song', 'delete-song']);

const schema = reactive({
  modifiedName: 'required',
});
const isEditFormOpen = ref(false);
const submission = ref(false);

async function deleteSong() {
  const songRef = storageRef(storage, `songs/${props.song.originalName}`);

  await deleteObject(songRef);
  await deleteDoc(doc(songsCollection, props.song.docID));

  emit('delete-song', props.song.docID);
}

async function onSubmit(values) {
  submission.value = true;

  try {
    await updateDoc(doc(songsCollection, props.song.docID), values);
  } catch (err) {
    console.log(err);
  }

  submission.value = false;

  emit('edit-song', props.song.docID, values);
}
</script>

<template>
  <li>
    <div v-show="isEditFormOpen" class="rel p:30|30|60 mb:50 bg:black r:30">
      <VForm
        :validation-schema="schema"
        :initial-values="song"
        @submit="onSubmit"
      >
        <div>
          <label class="f:bold fg:white f:18@md">歌曲名稱</label>
          <VField
            class="block w:full h:60 px:24 mt:8 fg:white bg:black b:3|solid|#333 rounded outline:0 b:#777:focus"
            type="text"
            name="modifiedName"
          />
          <ErrorMessage
            v-slot="{ message }"
            class="rel flex ai:center gap-x:6 mt:8"
            as="div"
            name="modifiedName"
          >
            <span
              class="flex center-content w:16 h:16 f:12 fg:white bg:danger round"
              >!</span
            >
            <p class="f:13 fg:danger">{{ message }}</p>
          </ErrorMessage>
        </div>
        <div class="mt:20">
          <label class="f:bold fg:white f:18@md">歌曲風格</label>
          <VField
            class="block w:full h:60 px:24 mt:8 fg:white bg:black b:3|solid|#333 rounded outline:0 appearance:none b:#777:focus"
            as="select"
            name="genre"
          >
            <option value="無">無</option>
            <option value="抒情">抒情</option>
            <option value="流行">流行</option>
            <option value="搖滾">搖滾</option>
            <option value="饒舌">饒舌</option>
            <option value="古典">古典</option>
          </VField>
        </div>
        <div
          class="abs bottom:0 left:1/2 flex w:240 h:60 overflow:hidden bg:black b:3|solid|#333 rounded translate(-50%,50%) {content:'';abs;top:1/2;left:1/2;w:3;h:30;bg:#333;translate(-50%,-50%)}::before"
        >
          <button
            class="flex center-content w:1/2 h:full fg:white bg:white/.1:hover"
            type="submit"
            :disabled="submission"
          >
            確定
          </button>
          <button
            class="flex center-content w:1/2 h:full fg:white bg:white/.1:hover"
            type="button"
            :disabled="submission"
            @click="isEditFormOpen = !isEditFormOpen"
          >
            取消
          </button>
        </div>
      </VForm>
    </div>

    <div
      v-show="!isEditFormOpen"
      class="flex jc:space-between ai:center gap-x:20 h:80 pl:30 pr:10 bg:black rounded"
    >
      <div class="flex:1 lines:1">
        <h3 class="f:bold fg:white f:18@md" title="陳約翰 - 不過就這樣">
          {{ song.modifiedName }}
        </h3>
      </div>
      <div
        class="rel flex w:120 h:60 overflow:hidden bg:black b:3|solid|#333 rounded {content:'';abs;top:1/2;left:1/2;w:3;h:30;bg:#333;translate(-50%,-50%)}::before"
      >
        <button
          class="flex center-content w:1/2 h:full bg:white/.1:hover"
          type="button"
          @click="isEditFormOpen = !isEditFormOpen"
        ></button>
        <button
          class="flex center-content w:1/2 h:full bg:white/.1:hover"
          type="button"
          @click.prevent="deleteSong"
        ></button>
      </div>
    </div>
  </li>
</template>
