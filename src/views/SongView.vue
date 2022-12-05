<script setup>
import { useSong } from '@/composables/useSong';
import IconLoading from '@/components/icons/IconLoading.vue';
import SongInformation from '@/components/SongInformation.vue';
import SongBadgePreview from '@/components/SongBadgePreview.vue';
import CommentPost from '@/components/CommentPost.vue';

const { isPending, songs, songListRef } = useSong();
</script>

<template>
  <div class="pt:100 pt:140@md">
    <div
      class="min-h:calc(100vh-100px) p:50|20|140 bg:#030303 rt:40 {min-h:calc(100vh-140px);p:80|80|140;rt:60}@md"
    >
      <div class="max-w:1500 mx:auto">
        <div class="grid-cols:1 gap:60|40 grid-cols:5@lg">
          <div class="grid-col-span:3@lg">
            <div>
              <h2 class="f:bold f:24 fg:white f:28@md">歌曲資訊</h2>
              <div class="mt:30">
                <SongInformation />
              </div>
              <div class="mt:40">
                <CommentPost />
              </div>
            </div>
          </div>
          <div class="grid-col-span:2@lg">
            <h2 class="f:bold f:24 fg:white f:28@md">更多歌曲</h2>
            <div ref="songListRef" class="rel mt:30">
              <TransitionGroup name="fade">
                <ul>
                  <li
                    v-for="song in songs"
                    :key="song.docID"
                    class="bb:1|solid|white/.1"
                  >
                    <SongBadgePreview :song="song" />
                  </li>
                </ul>
              </TransitionGroup>
              <Transition name="fade">
                <div
                  v-show="isPending"
                  class="abs bottom:-50 left:1/2 fg:white translateX(-50%) bottom:-60@md"
                >
                  <IconLoading :width="40" :height="40" />
                </div>
              </Transition>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
