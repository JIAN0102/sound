<script setup>
import { ref, reactive, onMounted } from 'vue';
import { doc, updateDoc } from 'firebase/firestore';
import {
  ref as storageRef,
  uploadBytes,
  getDownloadURL,
} from 'firebase/storage';
import { auth, storage, songsCollection } from '@/plugins/firebase';
import { v4 as uuidv4 } from 'uuid';
import IconLoading from '@/components/icons/IconLoading.vue';
import IconCamera from '@/components/icons/IconCamera.vue';
import IconAlert from '@/components/icons/IconAlert.vue';
import IconSelectArrow from '@/components/icons/IconSelectArrow.vue';
import BaseModal from '@/components/BaseModal.vue';

const props = defineProps({
  song: {
    type: Object,
    required: true,
  },
});

const emit = defineEmits(['edit-song', 'close-modal']);

const tags = ref([...props.song.tags]);
const tagInput = ref('');
const tagInputRef = ref(null);

function focusTagInput() {
  tagInputRef.value.focus();
}

function addTag(tag) {
  if (tagInput.value === '' || tags.value.includes(tag)) {
    tagInput.value = '';
    return;
  }
  tags.value.push(tag);
  tagInput.value = '';
}

function removeTag(index) {
  tags.value.splice(index, 1);
}

const cover = ref(null);
const coverUrl = ref(props.song.coverUrl);
const coverTypes = ['image/jpeg', 'image/png'];
const reader = new FileReader();

function handleChange(event) {
  const file = event.target.files[0];

  if (!coverTypes.includes(file.type)) return;

  cover.value = file;
  reader.readAsDataURL(event.target.files[0]);
}

function handleFileLoaded(event) {
  coverUrl.value = event.target.result;
}

onMounted(() => {
  reader.onload = handleFileLoaded;
});

const schema = reactive({
  title: 'required',
});
const submission = ref(false);

async function onSubmit(values) {
  submission.value = true;

  values.tags = tags.value;

  if (cover.value) {
    const coverRef = storageRef(
      storage,
      `covers/${auth.currentUser.uid}/${uuidv4()}`
    );
    try {
      const res = await uploadBytes(coverRef, cover.value);
      const coverUrl = await getDownloadURL(res.ref);
      values.coverUrl = coverUrl;
    } catch (error) {
      console.log(error);
    }
  }

  try {
    await updateDoc(doc(songsCollection, props.song.docID), values);
    emit('edit-song', values);
  } catch (error) {
    console.log(error);
  }

  tagInput.value = '';
  submission.value = false;
  emit('close-modal');
}
</script>

<template>
  <BaseModal>
    <template #button>
      <button
        class="abs top:20 right:20 z:10 w:40 h:40 b:3|solid|#212121 round {top:30;right:30}@md {abs;top:1/2;left:1/2;w:16;h:3;bg:white;rounded}>span"
        type="button"
        @click="$emit('close-modal')"
      >
        <span class="translate(-50%,-50%)|rotate(45)"></span>
        <span class="translate(-50%,-50%)|rotate(-45)"></span>
      </button>
    </template>

    <template #header>
      <h3 class="f:bold f:24 fg:white f:28@md">編輯歌曲</h3>
    </template>

    <template #body>
      <VForm
        :validation-schema="schema"
        :initial-values="song"
        @submit="onSubmit"
      >
        <fieldset
          :disabled="submission"
          :class="{ 'pointer-events:none': submission }"
        >
          <div>
            <label
              class="rel square block max-w:200 mx:auto overflow:hidden bg:linear-gradient(145deg,#383838,#767676) b:2|dashed|white/.5 r:8 ~border-color|.1s b:white:hover@md"
              for="uploadCover"
            >
              <img
                v-if="coverUrl"
                class="full obj:cover"
                :src="coverUrl"
                alt=""
              />
              <div class="abs top:1/2 left:1/2 fg:white translate(-50%,-50%)">
                <IconCamera :width="36" :height="36" />
              </div>
            </label>
            <input
              id="uploadCover"
              type="file"
              class="hide fg:white"
              @change="handleChange"
            />
            <h3 class="rel mt:20 f:bold fg:white lh:1.5 t:center f:20@md">
              上傳歌曲封面
              <br />
              <span class="f:14 fg:white/.5">支援檔案類型：JPG、PNG。≤3MB</span>
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
                  class="block w:full h:60 px:24 mt:8 fg:white bg:#030303 b:3|solid|transparent rounded outline:0 b:#696969:focus"
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
                class="block w:full h:60 px:24 mt:8 fg:white bg:#030303 b:3|solid|transparent rounded outline:0 appearance:none b:#696969:focus"
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
                class="block w:full h:140 p:16|24 mt:8 fg:white lh:1.75 bg:#030303 b:3|solid|transparent r:30 outline:0 resize:none b:#696969:focus fg:#696969::placeholder {w:5;rounded}::scrollbar bg:white::scrollbar-thumb rounded::scrollbar-thumb"
                type="text"
              ></textarea>
            </VField>
          </div>
          <div class="mt:20" @click="focusTagInput">
            <label class="f:bold fg:white f:18@md">附加標籤</label>
            <div
              class="flex flex:wrap gap:8 min-h:60 p:12|24 mt:8 cursor:text bg:#030303 b:3|solid|transparent r:30"
            >
              <div
                v-for="(tag, index) of tags"
                :key="tag"
                class="rel flex ai:center gap-x:3 h:30 pr:10 pl:20 f:14 fg:white cursor:pointer bg:#383838 rounded t:line-through:hover {content:'#';abs;top:8;left:8;fg:white/.5}::before"
                @click="removeTag(index)"
              >
                <span>{{ tag }}</span>
              </div>
              <input
                ref="tagInputRef"
                v-model="tagInput"
                class="w:120 fg:white outline:0"
                type="text"
                @keypress.enter.prevent="addTag(tagInput)"
              />
            </div>
          </div>
          <div
            class="rel flex w:200 h:60 mt:20 mx:auto overflow:hidden bg:#212121 b:3|solid|#030303 rounded {content:'';abs;top:1/2;left:1/2;w:3;h:30;bg:#030303;translate(-50%,-50%)}::before"
          >
            <button
              class="flex center-content w:1/2 h:full fg:white bg:#383838:hover@md"
              type="submit"
            >
              <IconLoading v-if="submission" />
              <span v-else>確定</span>
            </button>
            <button
              class="flex center-content w:1/2 h:full fg:white bg:#383838:hover@md"
              type="button"
              @click="$emit('close-modal')"
            >
              取消
            </button>
          </div>
        </fieldset>
      </VForm>
    </template>
  </BaseModal>
</template>
