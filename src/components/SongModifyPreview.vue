<script setup>
import { ref } from 'vue';
import { useSongStore } from '@/stores/song';
import IconLoading from '@/components/icons/IconLoading.vue';
import IconEdit from '@/components/icons/IconEdit.vue';
import IconDelete from '@/components/icons/IconDelete.vue';
import SongModifyForm from '@/components/SongModifyForm.vue';

defineProps({
  song: {
    type: Object,
    required: true,
  },
});

const songStore = useSongStore();
const { deleteSong } = songStore;

const isEdit = ref(false);
const isPending = ref(false);

async function handleClick(docID, uuid) {
  isPending.value = true;
  await deleteSong(docID, uuid);
  isPending.value = false;
}
</script>

<template>
  <SongModifyForm v-if="isEdit" :song="song" @close-form="isEdit = false" />

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
        @click="isEdit = true"
      >
        <IconEdit :width="20" :height="20" />
      </button>
      <button
        class="flex center-content w:1/2 h:full fg:white bg:#525252:hover@md pointer-events:none:disabled"
        type="button"
        :disabled="isPending"
        @click="handleClick(song.docID, song.uuid)"
      >
        <IconLoading v-if="isPending" :width="20" :height="20" />
        <IconDelete v-else :width="20" :height="20" />
      </button>
    </div>
  </div>
</template>
