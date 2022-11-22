<script setup>
import { ref, watch } from 'vue';
import { RouterLink, useRoute } from 'vue-router';
import { storeToRefs } from 'pinia';
import { useModalStore } from '@/stores/modal';
import { useUserStore } from '@/stores/user';
import IconUser from '@/components/icons/IconUser.vue';
import IconUpload from '@/components/icons/IconUpload.vue';
import IconLogout from '@/components/icons/IconLogout.vue';

const route = useRoute();

const modalStore = useModalStore();
const { toggleModal } = modalStore;

const userStore = useUserStore();
const { isLoggedIn } = storeToRefs(userStore);
const { logout } = userStore;

const isMenuOpen = ref(false);

async function handleClick() {
  await logout();
  window.location.reload();
}

watch(
  () => route.path,
  () => {
    isMenuOpen.value = false;
  }
);
</script>

<template>
  <header
    class="fixed top:0 left:0 z:999 flex jc:space-between ai:center w:full h:100 px:20 pointer-events:none {h:140;px:80}@md"
  >
    <RouterLink class="pointer-events:auto" :to="{ name: 'home' }">
      <div class="w:40 h:40 bg:white round {w:50;h:50}@md"></div>
    </RouterLink>

    <nav class="pointer-events:auto hide@<md">
      <button
        v-if="!isLoggedIn"
        class="group rel bg:black rounded"
        type="button"
        @click.prevent="toggleModal"
      >
        <div
          class="abs inset:0 rounded @backgorundColor|2s|linear|infinite opacity:0 ~opacity|.3s .group:hover_{opacity:1}"
        ></div>
        <div class="rel flex ai:center gap-x:10 h:60 pl:14 pr:30">
          <div
            class="flex center-content w:32 h:32 fg:white bg:#333 round ~background-color|.2s .group:hover_{bg:black}"
          >
            <IconUser :width="20" :height="20" />
          </div>
          <span class="f:bold fg:white ~color|.2s .group:hover_{fg:black}"
            >登入 / 註冊</span
          >
        </div>
      </button>
      <ul v-else class="flex ai:center gap-x:20">
        <li>
          <RouterLink
            class="group rel block bg:black rounded"
            :to="{ name: 'manage' }"
          >
            <div
              class="abs inset:0 rounded @backgorundColor|2s|linear|infinite opacity:0 ~opacity|.3s .group:hover_{opacity:1}"
            ></div>
            <div class="rel flex ai:center gap-x:10 h:60 pl:14 pr:30">
              <div
                class="flex center-content w:32 h:32 fg:white bg:#333 round ~background-color|.2s .group:hover_{bg:black}"
              >
                <IconUpload :width="20" :height="20" />
              </div>
              <span class="f:bold fg:white ~color|.2s .group:hover_{fg:black}">
                上傳歌曲</span
              >
            </div>
          </RouterLink>
        </li>
        <li>
          <button
            class="flex center-content w:60 h:60 fg:white bg:black round"
            type="button"
            @click.prevent="handleClick"
          >
            <IconLogout />
          </button>
        </li>
      </ul>
    </nav>

    <button
      class="rel flex flex:col center-content w:40 h:40 pointer-events:auto hide@md {block;w:40;h:1;bg:white}>span mt:5>span~span"
      type="button"
      @click.prevent="isMenuOpen = !isMenuOpen"
    >
      <span></span>
      <span></span>
    </button>
  </header>

  <nav
    v-show="isMenuOpen"
    class="fixed inset:0 z:998 flex center-content p:80|20 w:full bg:black"
  >
    <ul class="f:bold f:24 fg:white t:center mt:15>li~li">
      <template v-if="isLoggedIn">
        <li>
          <RouterLink :to="{ name: 'manage' }">上傳歌曲</RouterLink>
        </li>
        <li>
          <h3 @click.prevent="handleClick">登出</h3>
        </li>
      </template>
      <li v-else @click.prevent="toggleModal">登入 / 註冊</li>
    </ul>
  </nav>
</template>
