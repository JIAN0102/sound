<script setup>
import { ref, reactive } from 'vue';
import { useSongStore } from '@/stores/song';
import IconLoading from '@/components/icons/IconLoading.vue';
import IconEdit from '@/components/icons/IconEdit.vue';
import IconDelete from '@/components/icons/IconDelete.vue';
import IconAlert from '@/components/icons/IconAlert.vue';
import IconSelectArrow from '@/components/icons/IconSelectArrow.vue';

const props = defineProps({
  song: {
    type: Object,
    required: true,
  },
});

const songStore = useSongStore();
const { editSong, deleteSong } = songStore;

const schema = reactive({
  title: 'required',
});
const isEditFormOpen = ref(false);
const submission = ref(false);
const isPending = ref(false);

async function onSubmit(values) {
  submission.value = true;

  try {
    await editSong(props.song.docID, values);
  } catch (error) {
    console.log(error);
  }

  isEditFormOpen.value = false;
  submission.value = false;
}

async function handleClick(docID, uuid) {
  isPending.value = true;
  await deleteSong(docID, uuid);
  isPending.value = false;
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
              v-slot="{ field, errorMessage, meta }"
              name="title"
              label="歌曲名稱"
            >
              <div class="rel">
                <input
                  v-bind="field"
                  class="block w:full h:60 px:24 mt:8 fg:white bg:black b:3|solid|#333 rounded outline:0 b:#777:focus"
                  :class="{ 'b:danger!': !meta.valid && meta.touched }"
                  type="text"
                />
                <div
                  v-if="!meta.valid && meta.touched"
                  class="abs top:1/2 right:20 fg:danger translateY(-50%)"
                >
                  <IconAlert />
                </div>
              </div>
              <div
                v-if="!meta.valid && meta.touched"
                class="flex ai:center gap-x:6 mt:8 f:13 fg:danger"
              >
                {{ errorMessage }}
              </div>
            </VField>
          </div>
          <div class="mt:20">
            <label class="f:bold fg:white f:18@md">曲風</label>
            <div class="rel">
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
              <div class="abs top:1/2 right:24 fg:white translateY(-50%)">
                <IconSelectArrow :width="16" :height="16" />
              </div>
            </div>
          </div>
        </div>
        <div
          class="rel flex w:240 h:60 mt:-30 mx:auto overflow:hidden bg:black b:3|solid|#333 rounded {content:'';abs;top:1/2;left:1/2;w:3;h:30;bg:#333;translate(-50%,-50%)}::before"
        >
          <button
            class="flex center-content w:1/2 h:full fg:white bg:#111:hover@md pointer-events:none:disabled"
            type="submit"
            :disabled="submission"
          >
            <IconLoading v-if="submission" />
            <span v-else>確定</span>
          </button>
          <button
            class="flex center-content w:1/2 h:full fg:white bg:#111:hover@md pointer-events:none:disabled"
            type="reset"
            :disabled="submission"
            @click="isEditFormOpen = false"
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
      <h3 class="flex:1 f:bold fg:white lines:1 f:18@md" :title="song.title">
        {{ song.title }}
      </h3>
      <div
        class="rel flex w:100 h:60 overflow:hidden bg:black b:3|solid|#333 rounded w:120@xs {content:'';abs;top:1/2;left:1/2;w:3;h:20;bg:#333;translate(-50%,-50%)}::before"
      >
        <button
          class="flex center-content w:1/2 h:full fg:white bg:#111:hover@md"
          type="button"
          @click="isEditFormOpen = !isEditFormOpen"
        >
          <IconEdit :width="20" :height="20" />
        </button>
        <button
          class="flex center-content w:1/2 h:full fg:white bg:#111:hover@md pointer-events:none:disabled"
          type="button"
          :disabled="isPending"
          @click="handleClick(song.docID, song.uuid)"
        >
          <IconLoading v-if="isPending" :width="20" :height="20" />
          <IconDelete v-else :width="20" :height="20" />
        </button>
      </div>
    </div>
  </li>
</template>
