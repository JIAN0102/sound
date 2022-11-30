<script setup>
import { RouterLink } from 'vue-router';
import { storeToRefs } from 'pinia';
import { useModalStore } from '@/stores/modal';
import { useUserStore } from '@/stores/user';
import IconUser from '@/components/icons/IconUser.vue';
import IconLogout from '@/components/icons/IconLogout.vue';
import IconWave from '@/components/icons/IconWave.vue';

const modalStore = useModalStore();
const { toggleModal } = modalStore;

const userStore = useUserStore();
const { isLoggedIn } = storeToRefs(userStore);
const { logout } = userStore;

async function handleClick() {
  await logout();
  window.location.reload();
}
</script>

<template>
  <header
    class="fixed top:0 left:0 z:999 flex jc:space-between ai:center w:full h:100 px:20 pointer-events:none {h:140;px:80}@md"
  >
    <RouterLink
      class="flex ai:center fg:white pointer-events:auto"
      :to="{ name: 'home' }"
    >
      <img
        class="w:65 w:auto@xs"
        src="/assets/img/sound-logo.svg"
        alt="sound"
      />
    </RouterLink>

    <nav class="pointer-events:auto">
      <button
        v-if="!isLoggedIn"
        class="group rel overflow:hidden bg:black rounded"
        type="button"
        @click.prevent="toggleModal"
      >
        <div
          class="abs top:1/2 left:1/2 w:150% h:150% round transform:top translate(-50%,-50%)|scaleY(0) ~transform|.4s @backgroundGradient|2s|linear|infinite .group:hover_{transform:bottom;translate(-50%,-50%)|scaleY(1)}@md"
        ></div>
        <div
          class="rel flex ai:center gap-x:6 h:50 pl:10 pr:20 {gap-x:10;h:60;pl:14;pr:30}@md"
        >
          <div
            class="flex center-content w:30 h:30 fg:white bg:#333 round ~background-color|.5s {w:32;h:32}@md .group:hover_{bg:black}@md"
          >
            <div class="w:18 h:18 {w:20;h:20}@md">
              <IconUser :width="'100%'" :height="'100%'" />
            </div>
          </div>
          <span
            class="f:bold f:14 fg:white ~color|.5s f:16@md .group:hover_{fg:black}@md"
          >
            登入 / 註冊</span
          >
        </div>
      </button>
      <ul v-else class="flex ai:center gap-x:10 gap-x:20@md">
        <li>
          <RouterLink
            class="group rel block overflow:hidden bg:black rounded"
            :to="{ name: 'manage' }"
          >
            <div
              class="abs top:1/2 left:1/2 w:150% h:150% round transform:top translate(-50%,-50%)|scaleY(0) ~transform|.4s @backgroundGradient|2s|linear|infinite .group:hover_{transform:bottom;translate(-50%,-50%)|scaleY(1)}@md"
            ></div>
            <div
              class="rel flex ai:center gap-x:6 h:50 pl:10 pr:20 {gap-x:10;h:60;pl:14;pr:30}@md"
            >
              <div
                class="flex ai:center w:30 h:30 overflow:hidden fg:white bg:#333 round ~background-color|.5s {w:32;h:32}@md .group:hover_{bg:black}@md"
              >
                <div class="w:28 @wave|2s|linear|infinite">
                  <IconWave />
                </div>
                <div class="w:28 @wave|2s|linear|infinite">
                  <IconWave />
                </div>
              </div>
              <span
                class="f:bold f:14 fg:white ~color|.5s f:16@md .group:hover_{fg:black}@md"
              >
                上傳歌曲</span
              >
            </div>
          </RouterLink>
        </li>
        <li>
          <button
            class="flex center-content w:50 h:50 fg:white bg:black round {w:60;h:60}@md"
            type="button"
            @click="handleClick"
          >
            <IconLogout />
          </button>
        </li>
      </ul>
    </nav>
  </header>
</template>
