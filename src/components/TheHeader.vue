<script setup>
import { RouterLink } from 'vue-router';
import { storeToRefs } from 'pinia';
import { useModalStore } from '@/stores/modal';
import { useUserStore } from '@/stores/user';
import { signOut } from 'firebase/auth';
import { auth } from '@/plugins/firebase';
import IconUser from '@/components/icons/IconUser.vue';
import IconLogout from '@/components/icons/IconLogout.vue';
import IconWave from '@/components/icons/IconWave.vue';

const modalStore = useModalStore();
const { toggleModal } = modalStore;

const userStore = useUserStore();
const { isLoggedIn } = storeToRefs(userStore);

async function handleClick() {
  try {
    await signOut(auth);
    window.location.reload();
  } catch (error) {
    console.log(error);
  }
}
</script>

<template>
  <header
    class="fixed top:0 left:0 z:999 flex jc:space-between ai:center w:full h:100 px:20 pointer-events:none {h:140;px:40}@md px:80@lg"
  >
    <RouterLink class="pointer-events:auto" :to="{ name: 'home' }">
      <img
        class="w:80 w:auto@md"
        src="/assets/img/sound-logo.svg"
        alt="sound"
      />
    </RouterLink>

    <nav class="pointer-events:auto">
      <button
        v-if="!isLoggedIn"
        class="group rel z:1 overflow:hidden bg:#030303 rounded"
        type="button"
        @click="toggleModal"
      >
        <div
          class="abs top:1/2 left:1/2 w:150% h:150% round transform:top translate(-50%,-50%)|scaleY(0) ~transform|.4s @background-gradient|2s|linear|infinite .group:hover_{transform:bottom;translate(-50%,-50%)|scaleY(1)}@md"
        ></div>
        <div class="rel flex ai:center gap-x:10 h:60 pl:10 pr:24">
          <div
            class="flex center-content w:40 h:40 fg:white bg:#212121 round ~background-color|.5s .group:hover_{bg:#030303}@md"
          >
            <IconUser :width="20" :height="20" />
          </div>
          <span class="f:bold fg:white ~color|.5s .group:hover_{fg:black}@md">
            登入 / 註冊</span
          >
        </div>
      </button>
      <ul v-else class="flex ai:center gap-x:10 gap-x:20@md">
        <li>
          <RouterLink
            class="group rel z:1 block overflow:hidden bg:#030303 rounded"
            :to="{ name: 'manage' }"
          >
            <div
              class="abs top:1/2 left:1/2 w:150% h:150% round transform:top translate(-50%,-50%)|scaleY(0) ~transform|.4s @background-gradient|2s|linear|infinite .group:hover_{transform:bottom;translate(-50%,-50%)|scaleY(1)}@md"
            ></div>
            <div class="rel flex ai:center gap-x:10 h:60 pl:10 pr:24">
              <div
                class="flex ai:center w:40 h:40 overflow:hidden fg:white bg:#212121 round ~background-color|.5s .group:hover_{bg:#030303}@md"
              >
                <div class="w:28 @wave|2s|linear|infinite">
                  <IconWave />
                </div>
                <div class="w:28 @wave|2s|linear|infinite">
                  <IconWave />
                </div>
                <div class="w:28 @wave|2s|linear|infinite">
                  <IconWave />
                </div>
              </div>
              <span
                class="f:bold fg:white ~color|.5s .group:hover_{fg:black}@md"
              >
                我的歌曲</span
              >
            </div>
          </RouterLink>
        </li>
        <li>
          <button
            class="flex center-content w:60 h:60 fg:white bg:#030303 round"
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
