<script setup>
import { ref } from 'vue';
import IconUpload from '@/components/icons/IconUpload.vue';

const emit = defineEmits(['upload-file']);

const isDragOver = ref(false);
const uploadRef = ref(null);

function uploadFile(event) {
  isDragOver.value = false;

  const files = event.dataTransfer
    ? [...event.dataTransfer.files]
    : [...event.target.files];

  uploadRef.value.value = '';

  emit('upload-file', files);
}
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
</template>
