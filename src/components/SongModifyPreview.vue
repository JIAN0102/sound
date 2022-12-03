<script setup>
import { ref, reactive, watch, onMounted } from 'vue';
import { v4 as uuidv4 } from 'uuid';
import {
  ref as storageRef,
  uploadBytes,
  getDownloadURL,
} from 'firebase/storage';
import { auth, storage } from '@/plugins/firebase';
import { useSongStore } from '@/stores/song';
import IconLoading from '@/components/icons/IconLoading.vue';
import IconCamera from '@/components/icons/IconCamera.vue';
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

const isEdit = ref(false);
const isPending = ref(false);

const cacheTags = ref([...props.song.tags]);
const tagInput = ref('');
const tagInputRef = ref(null);

function focusTagInput() {
  tagInputRef.value.focus();
}

function addTag(tag) {
  if (tagInput.value === '') return;
  if (cacheTags.value.includes(tag)) {
    tagInput.value = '';
    return;
  }
  cacheTags.value.push(tag);
  tagInput.value = '';
}

function deleteTag(index) {
  cacheTags.value.splice(index, 1);
}

const cacheCoverUrl = ref(props.song.coverUrl);
const cover = ref(null);
const types = ['image/png', 'image/jpeg'];
const reader = new FileReader();

function handleChange(event) {
  const file = event.target.files[0];

  if (file && types.includes(file.type)) {
    cover.value = file;
    reader.readAsDataURL(event.target.files[0]);
  } else {
    cover.value = null;
  }
}

function handleFileLoaded(event) {
  cacheCoverUrl.value = event.target.result;
}

function handleClose() {
  isEdit.value = false;
  cacheTags.value = [...props.song.tags];
  cacheCoverUrl.value = props.song.coverUrl;
  tagInput.value = '';
}

onMounted(() => {
  reader.onload = handleFileLoaded;
});

watch(
  () => props.song,
  () => {
    cacheTags.value = [...props.song.tags];
    cacheCoverUrl.value = props.song.coverUrl;
  },
  { deep: true }
);

const schema = reactive({
  title: 'required',
});
const submission = ref(false);

async function onSubmit(values) {
  submission.value = true;

  values.tags = [...cacheTags.value];

  if (cover.value) {
    const coverRef = storageRef(
      storage,
      `covers/${auth.currentUser.uid}/${uuidv4()}`
    );
    const res = await uploadBytes(coverRef, cover.value);
    const coverUrl = await getDownloadURL(res.ref);

    values.coverUrl = coverUrl;
  }

  try {
    await editSong(props.song.docID, values);
  } catch (error) {
    console.log(error);
  }

  tagInput.value = '';
  isEdit.value = false;
  submission.value = false;
}

async function handleDelete(docID, uuid) {
  isPending.value = true;
  await deleteSong(docID, uuid);
  isPending.value = false;
}
</script>

<template>
  <div v-if="isEdit" class="rel">
    <VForm
      :validation-schema="schema"
      :initial-values="song"
      @submit="onSubmit"
    >
      <fieldset :disabled="submission">
        <div class="rel p:30|30|60 bg:#393939 r:30">
          <div>
            <label
              class="rel square block max-w:300 mx:auto overflow:hidden bg:#262626 b:2|dashed|#696969 r:30 ~background-color|.1s,border-color|.1s {b:white}:hover@md"
              for="uploadImage"
            >
              <img
                class="abs top:0 left:0 full obj:cover"
                :src="cacheCoverUrl"
                alt=""
              />
              <div class="abs top:1/2 left:1/2 fg:white translate(-50%,-50%)">
                <IconCamera :width="32" :height="32" />
              </div>
            </label>
            <input
              id="uploadImage"
              type="file"
              class="hide fg:white"
              @change="handleChange"
            />
            <h3 class="rel mt:20 f:bold fg:white lh:1.5 t:center f:20@md">
              上傳歌曲封面
              <br />
              <span class="f:14 fg:#8b8b8b">支援檔案類型：JPG、PNG。≤1MB</span>
            </h3>
          </div>
          <div class="mt:30">
            <label class="f:bold fg:white f:18@md">歌曲名稱</label>
            <VField
              v-slot="{ field, errorMessage, meta }"
              name="title"
              label="歌曲名稱"
            >
              <div class="rel">
                <input
                  v-bind="field"
                  class="block w:full h:60 px:24 mt:8 fg:white bg:#262626 b:3|solid|transparent rounded outline:0 b:#666:focus"
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
                class="block w:full h:60 px:24 mt:8 fg:white bg:#262626 b:3|solid|transparent rounded outline:0 appearance:none b:#666:focus"
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
          <div class="mt:20">
            <label class="f:bold fg:white f:18@md">描述</label>
            <VField v-slot="{ field }" name="description">
              <textarea
                v-bind="field"
                class="block w:full h:140 p:16|24 mt:8 fg:white lh:1.75 bg:#262626 b:3|solid|transparent r:30 outline:0 resize:none b:#666:focus fg:#696969::placeholder pointer-events:none:disabled"
                type="text"
              ></textarea>
            </VField>
          </div>
          <div class="mt:20" @click="focusTagInput">
            <label class="f:bold fg:white f:18@md">附加標籤</label>
            <div
              class="flex flex:col gap-y:8 p:17|24 mt:8 bg:#262626 b:3|solid|transparent r:30"
            >
              <ul v-if="cacheTags.length" class="flex flex:wrap gap:8">
                <li v-for="(tag, index) of cacheTags" :key="tag">
                  <span
                    class="rel block p:6|10|6|20 f:14 fg:white cursor:pointer bg:#393939 rounded {content:'#';abs;top:8;left:8;fg:white/.5}::before t:line-through:hover"
                    @click="deleteTag(index)"
                  >
                    {{ tag }}
                  </span>
                </li>
              </ul>
              <input
                ref="tagInputRef"
                v-model="tagInput"
                class="block w:full fg:white outline:0"
                type="text"
                @keypress.enter.prevent="addTag(tagInput)"
              />
            </div>
          </div>
        </div>
        <div
          class="rel flex w:240 h:60 mt:-30 mx:auto overflow:hidden bg:#393939 b:3|solid|#262626 rounded {content:'';abs;top:1/2;left:1/2;w:3;h:30;bg:#262626;translate(-50%,-50%)}::before"
        >
          <button
            class="flex center-content w:1/2 h:full fg:white bg:#525252:hover@md pointer-events:none:disabled"
            type="submit"
            :disabled="submission"
          >
            <IconLoading v-if="submission" />
            <span v-else>確定</span>
          </button>
          <button
            class="flex center-content w:1/2 h:full fg:white bg:#525252:hover@md pointer-events:none:disabled"
            type="button"
            :disabled="submission"
            @click="handleClose"
          >
            取消
          </button>
        </div>
      </fieldset>
    </VForm>
  </div>

  <div
    v-else
    class="flex jc:space-between ai:center gap-x:20 h:80 pl:30 pr:10 bg:#393939 rounded"
  >
    <h3 class="flex:1 f:bold fg:white lines:1 f:18@md" :title="song.title">
      {{ song.title }}
    </h3>
    <div
      class="rel flex w:100 h:60 overflow:hidden bg:#393939 b:3|solid|#262626 rounded w:120@xs {content:'';abs;top:1/2;left:1/2;w:3;h:20;bg:#262626;translate(-50%,-50%)}::before"
    >
      <button
        class="flex center-content w:1/2 h:full fg:white bg:#525252:hover@md"
        type="button"
        @click="isEdit = !isEdit"
      >
        <IconEdit :width="20" :height="20" />
      </button>
      <button
        class="flex center-content w:1/2 h:full fg:white bg:#525252:hover@md pointer-events:none:disabled"
        type="button"
        :disabled="isPending"
        @click="handleDelete(song.docID, song.uuid)"
      >
        <IconLoading v-if="isPending" :width="20" :height="20" />
        <IconDelete v-else :width="20" :height="20" />
      </button>
    </div>
  </div>
</template>
