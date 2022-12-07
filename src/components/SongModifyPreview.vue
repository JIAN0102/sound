<script setup>
import { ref, computed } from 'vue';
import { RouterLink } from 'vue-router';
import { usePlayerStore } from '@/stores/player';
import { doc, deleteDoc } from 'firebase/firestore';
import { ref as storageRef, deleteObject } from 'firebase/storage';
import { storage, songsCollection } from '@/plugins/firebase';
import { formatDistanceToNow } from 'date-fns';
import { zhTW } from 'date-fns/locale';
import IconLoading from '@/components/icons/IconLoading.vue';
import IconEdit from '@/components/icons/IconEdit.vue';
import IconDelete from '@/components/icons/IconDelete.vue';
import SongModifyForm from '@/components/SongModifyForm.vue';

const props = defineProps({
  song: {
    type: Object,
    required: true,
  },
});

const emit = defineEmits(['delete-song']);

const playerStore = usePlayerStore();
const { createSongWhenNotPlaying } = playerStore;

const isEdit = ref(false);
const isPending = ref(false);

const formattedCreatedAt = computed(() => {
  return formatDistanceToNow(props.song.createdAt.toDate(), {
    addSuffix: true,
    locale: zhTW,
  });
});

async function handleClick() {
  isPending.value = true;

  const songRef = storageRef(storage, `songs/${props.song.uuid}`);
  await deleteObject(songRef);
  await deleteDoc(doc(songsCollection, props.song.docID));
  emit('delete-song', props.song.docID);

  isPending.value = false;
}
</script>

<template>
  <SongModifyForm v-if="isEdit" :song="song" @close-form="isEdit = false" />

  <div v-else class="flex ai:center gap-x:20 p:8 r:4 bg:#212121:hover">
    <div class="flex ai:center gap-x:16 flex:1">
      <div
        class="rel square w:64 overflow:hidden bg:linear-gradient(145deg,#383838,#767676) r:4"
      >
        <img
          v-if="song.coverUrl"
          class="abs top:0 left:0 full obj:cover"
          :src="song.coverUrl"
          alt=""
        />
      </div>
      <div class="flex:1">
        <h3 class="f:bold fg:white lines:1">
          <RouterLink
            :to="{
              name: 'song',
              params: {
                id: song.docID,
              },
            }"
            @click="createSongWhenNotPlaying(song)"
          >
            {{ song.title }}
          </RouterLink>
        </h3>
        <h4 class="mt:4 f:14 fg:white/.5 lines:1">
          {{ formattedCreatedAt }}
        </h4>
      </div>
    </div>
    <div class="flex">
      <button
        class="flex center-content w:40 h:40 fg:white/.5 fg:white:hover"
        type="button"
        @click="isEdit = true"
      >
        <IconEdit :width="20" :height="20" />
      </button>
      <button
        class="flex center-content w:40 h:40 fg:white/.5 fg:white:hover pointer-events:none:disabled"
        type="button"
        :disabled="isPending"
        @click="handleClick"
      >
        <IconLoading v-if="isPending" :width="20" :height="20" />
        <IconDelete v-else :width="20" :height="20" />
      </button>
    </div>
  </div>
</template>
