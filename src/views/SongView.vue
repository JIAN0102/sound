<script setup>
import { useSong } from '@/composables/useSong';
import IconLoading from '@/components/icons/IconLoading.vue';
import BaseCard from '@/components/BaseCard.vue';
import SongInformation from '@/components/SongInformation.vue';
import SongBadgePreview from '@/components/SongBadgePreview.vue';
import CommentPost from '@/components/CommentPost.vue';

const { isPending, songs, songListRef } = useSong();
</script>

<template>
  <div class="pt:100 pt:140@md">
    <div
      class="grid-cols:1 gap:30|40 min-h:calc(100vh-100px) p:0|0|100 bg:black rt:40 {min-h:calc(100vh-140px);p:0|80|140;rt:60}@md grid-cols:5@lg"
    >
      <div class="grid-col-span:3@lg">
        <div>
          <BaseCard>
            <template #header>
              <h2 class="f:bold f:24 fg:white t:center {f:28;t:left}@md">
                歌曲資訊
              </h2>
            </template>

            <template #main>
              <SongInformation />

              <div class="mt:40">
                <CommentPost />
              </div>
            </template>
          </BaseCard>
        </div>
      </div>

      <div class="grid-col-span:2@lg">
        <BaseCard>
          <template #header>
            <h2 class="f:bold f:24 fg:white t:center {f:28;t:left}@md">
              更多歌曲
            </h2>
          </template>

          <template #main>
            <div ref="songListRef" class="rel">
              <div class="mt:10>div~div">
                <TransitionGroup name="fade">
                  <div v-for="song in songs" :key="song.docID">
                    <SongBadgePreview :song="song" />
                  </div>
                </TransitionGroup>
              </div>
              <Transition name="fade">
                <div
                  v-show="isPending"
                  class="abs bottom:-50 left:1/2 fg:white translateX(-50%) bottom:-60@md"
                >
                  <IconLoading :width="40" :height="40" />
                </div>
              </Transition>
            </div>
          </template>
        </BaseCard>
      </div>
    </div>
  </div>
</template>
