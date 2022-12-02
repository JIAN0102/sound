<script setup>
import { useSong } from '@/composables/song';
import IconLoading from '@/components/icons/IconLoading.vue';
import BaseCard from '@/components/BaseCard.vue';
import SongInformation from '@/components/SongInformation.vue';
import SongPreview from '@/components/SongPreview.vue';
import CommentPost from '@/components/CommentPost.vue';

const { isPending, songs, songListRef } = useSong();
</script>

<template>
  <div class="pt:100 pt:140@md">
    <div
      class="grid-cols:1 gap:30|40 min-h:calc(100vh-100px) p:0|0|100 bg:black rt:40 {min-h:calc(100vh-140px);p:0|80|140;rt:60}@md grid-cols:2@lg"
    >
      <div class="grid-col-span:2@lg">
        <BaseCard>
          <template #header>
            <h2 class="f:bold f:24 fg:white t:center {f:28;t:left}@md">
              歌曲資訊
            </h2>
          </template>

          <template #main>
            <SongInformation />
          </template>
        </BaseCard>
      </div>

      <div>
        <BaseCard>
          <template #header>
            <h2 class="f:bold f:24 fg:white t:center {f:28;t:left}@md">
              發表留言
            </h2>
          </template>

          <template #main>
            <CommentPost />
          </template>
        </BaseCard>
      </div>

      <div>
        <BaseCard>
          <template #header>
            <h2 class="f:bold f:24 fg:white t:center {f:28;t:left}@md">
              更多歌曲
            </h2>
          </template>

          <template #main>
            <div ref="songListRef" class="rel">
              <div class="grid-cols:1 gap-y:10">
                <TransitionGroup name="slide">
                  <SongPreview
                    v-for="song in songs"
                    :key="song.docID"
                    :song="song"
                  />
                </TransitionGroup>
              </div>
              <Transition name="fadeUp">
                <div
                  v-show="isPending"
                  class="abs bottom:0 left:1/2 fg:white translateX(-50%)"
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
