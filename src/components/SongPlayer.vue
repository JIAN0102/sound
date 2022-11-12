<script setup>
import { storeToRefs } from 'pinia';
import { usePlayerStore } from '@/stores/player';

const playerStore = usePlayerStore();
const { currentSong, seek, duration, volume, progress, isSoundPlaying } =
  storeToRefs(playerStore);
const { toggleAudio, updateSeek, updateVolume } = playerStore;
</script>

<template>
  <div
    class="fixed bottom:40 left:1/2 z:997 flex bg:black rounded translateX(-50%)"
  >
    <button
      class="rel w:140 h:80 mr:-30 bg:linear-gradient(to|right,primary,secondary) b:10|solid|black rl:9999"
      type="button"
      @click.prevent="toggleAudio"
    >
      <div v-show="isSoundPlaying">暫停</div>
      <div v-show="!isSoundPlaying">播放</div>
    </button>
    <div
      class="rel z:10 w:660 h:80 overflow:hidden bg:#333 b:10|solid|black rounded"
    >
      <div class="abs inset:0 cursor:pointer" @click.prevent="updateSeek">
        <div
          class="abs top:0 left:0 h:full pointer-events:none bg:#777 transform:left"
          :style="{ width: progress }"
        >
          <div
            class="abs inset:0 bg:url('/assets/img/progress-arrow.svg') @progress|1.5s|linear|infinite"
          ></div>
        </div>
        <div
          class="abs inset:0 flex jc:space-between ai:center gap-x:20 px:30 f:bold fg:white pointer-events:none"
        >
          <span>{{ seek }}</span>
          <h2 class="flex:1 t:center lines:1">
            {{ currentSong.modifiedName }}
          </h2>
          <span>{{ duration }}</span>
        </div>
      </div>
    </div>
    <div
      class="rel w:140 h:80 ml:-30 overflow:hidden bg:#333 b:10|solid|black rr:9999"
    >
      <div class="abs inset:0 cursor:pointer" @click.prevent="updateVolume">
        <div
          class="abs top:0 left:0 h:full bg:#777 transform:left"
          :style="{ width: `${volume * 100}%` }"
        ></div>
        <div
          class="abs top:1/2 left:30 w:24 h:24 bg:white round translateY(-50%)"
        ></div>
      </div>
    </div>
  </div>
</template>
