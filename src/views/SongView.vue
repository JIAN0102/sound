<script setup>
import { songsCollection } from '@/plugins/firebase';
import { useLimitDocument } from '@/composables/useLimitDocument';
import BaseLoading from '@/components/BaseLoading.vue';
import SongInformation from '@/components/SongInformation.vue';
import SongBadgePreview from '@/components/SongBadgePreview.vue';
import CommentPost from '@/components/CommentPost.vue';

const {
  isPending,
  documents: songs,
  loadingObserverRef,
} = useLimitDocument(18, songsCollection);
</script>

<template>
  <div class="pt:100 pt:140@md">
    <div
      class="min-h:calc(100vh-100px) p:50|20|140 bg:#030303 rt:40 {min-h:calc(100vh-140px);p:80|40|140;rt:60}@md px:80@lg"
    >
      <div class="max-w:1500 mx:auto">
        <div class="grid-cols:1 gap:60|40 grid-cols:5@md">
          <div class="grid-col-span:3@md">
            <SongInformation />
            <div class="mt:60 mt:40@md">
              <CommentPost />
            </div>
          </div>
          <div class="grid-col-span:2@md">
            <h2 class="f:bold f:24 fg:white f:28@sm f:32@md">更多歌曲</h2>
            <div class="rel mt:20 mt:30@md">
              <ul class="bb:1|solid|white/.1>li">
                <TransitionGroup name="fade">
                  <li v-for="song in songs" :key="song.docID">
                    <SongBadgePreview :song="song" />
                  </li>
                </TransitionGroup>
              </ul>
              <div
                ref="loadingObserverRef"
                class="abs bottom:-20 left:1/2 fg:white translate(-50%,100%) opacity:0 invisible {opacity:1;visible}.is-active"
                :class="{ 'is-active': isPending }"
              >
                <BaseLoading />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
