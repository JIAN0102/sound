<script setup>
import { ref, reactive } from 'vue';
import { useSongStore } from '@/stores/song';
import IconEdit from '@/components/icons/IconEdit.vue';
import IconDelete from '@/components/icons/IconDelete.vue';
import IconAlert from '@/components/icons/IconAlert.vue';

const props = defineProps({
  song: {
    type: Object,
    required: true,
  },
});

const songStore = useSongStore();
const { editSong, deleteSong } = songStore;

const schema = reactive({
  modifiedName: 'required',
});
const isEditFormOpen = ref(false);
const submission = ref(false);

async function onSubmit(values) {
  submission.value = true;

  try {
    await editSong(props.song.docID, values);
  } catch (err) {
    console.log(err);
  }

  isEditFormOpen.value = false;
  submission.value = false;
}
</script>

<template>
  <li>
    <div v-show="isEditFormOpen" class="rel">
      <VForm
        :validation-schema="schema"
        :initial-values="song"
        @submit="onSubmit"
      >
        <div class="rel p:30|30|60 bg:black r:30">
          <div>
            <label class="f:bold fg:white f:18@md">歌曲名稱</label>
            <VField
              class="block w:full h:60 px:24 mt:8 fg:white bg:black b:3|solid|#333 rounded outline:0 b:#777:focus"
              type="text"
              name="modifiedName"
              label="歌曲名稱"
            />
            <ErrorMessage
              v-slot="{ message }"
              class="rel flex ai:center gap-x:6 mt:8 f:13 fg:danger"
              as="div"
              name="modifiedName"
            >
              <IconAlert />
              {{ message }}
            </ErrorMessage>
          </div>
          <div class="mt:20">
            <label class="f:bold fg:white f:18@md">曲風</label>
            <VField
              class="block w:full h:60 px:24 mt:8 fg:white bg:black b:3|solid|#333 rounded outline:0 appearance:none b:#777:focus"
              as="select"
              name="genre"
            >
              <option value="無">無</option>
              <option value="流行">流行</option>
              <option value="搖滾">搖滾</option>
              <option value="饒舌">饒舌</option>
              <option value="古典">古典</option>
              <option value="藍調">藍調</option>
              <option value="爵士">爵士</option>
              <option value="鄉村">鄉村</option>
            </VField>
          </div>
        </div>
        <div
          class="rel flex w:240 h:60 mt:-30 mx:auto overflow:hidden bg:black b:3|solid|#333 rounded {content:'';abs;top:1/2;left:1/2;w:3;h:30;bg:#333;translate(-50%,-50%)}::before"
        >
          <button
            class="flex center-content w:1/2 h:full fg:white bg:#111:hover"
            type="submit"
            :disabled="submission"
          >
            確定
          </button>
          <button
            class="flex center-content w:1/2 h:full fg:white bg:#111:hover"
            type="button"
            :disabled="submission"
            @click.prevent="isEditFormOpen = !isEditFormOpen"
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
        <h3 class="f:bold fg:white f:18@md" :title="song.modifiedName">
          {{ song.modifiedName }}
        </h3>
      </div>
      <div
        class="rel flex w:120 h:60 overflow:hidden bg:black b:3|solid|#333 rounded {content:'';abs;top:1/2;left:1/2;w:3;h:20;bg:#333;translate(-50%,-50%)}::before"
      >
        <button
          class="flex center-content w:1/2 h:full fg:white bg:#111:hover"
          type="button"
          @click.prevent="isEditFormOpen = !isEditFormOpen"
        >
          <IconEdit />
        </button>
        <button
          class="flex center-content w:1/2 h:full fg:white bg:#111:hover"
          type="button"
          @click.prevent="deleteSong(song.docID, song.uuid)"
        >
          <IconDelete />
        </button>
      </div>
    </div>
  </li>
</template>
