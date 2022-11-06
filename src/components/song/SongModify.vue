<script setup>
import { ref } from 'vue';

const showEditForm = ref(false);

// const vClickOutside = {
//   created(el, binding) {
//     el.clickOutsideEvent = (e) => {
//       if (!(el === e.target || el.contains(e.target))) {
//         binding.value(e, el);
//       }
//     };
//     document.addEventListener('click', el.clickOutsideEvent);
//   },
//   beforeUnmount(el) {
//     document.removeEventListener('click', el.clickOutsideEvent);
//   },
// };
</script>

<template>
  <ul class="mt:20>li~li">
    <li>
      <div v-if="showEditForm" class="rel p:30|30|60 mb:50 bg:black r:30">
        <div>
          <h3 class="f:bold fg:white f:18@md">歌曲名稱</h3>
          <input
            class="block w:full h:60 px:24 mt:8 fg:white bg:black b:3|solid|#333 rounded outline:0 b:#777:focus"
            type="text"
          />
        </div>
        <div class="mt:20">
          <h3 class="f:bold fg:white f:18@md">歌曲風格</h3>
          <input
            class="block w:full h:60 px:24 mt:8 fg:white bg:black b:3|solid|#333 rounded outline:0 b:#777:focus"
            type="text"
          />
        </div>
        <div
          class="abs bottom:0 left:1/2 flex w:240 h:60 overflow:hidden bg:black b:3|solid|#333 rounded translate(-50%,50%) {content:'';abs;top:1/2;left:1/2;w:3;h:30;bg:#333;translate(-50%,-50%)}::before"
        >
          <button
            class="flex center-content w:1/2 h:full fg:white bg:white/.1:hover"
            type="button"
          >
            確定
          </button>
          <button
            class="flex center-content w:1/2 h:full fg:white bg:white/.1:hover"
            type="button"
            @click="showEditForm = false"
          >
            取消
          </button>
        </div>
      </div>
      <div
        v-else
        class="flex jc:space-between ai:center gap-x:20 h:80 pl:30 pr:10 bg:black rounded"
      >
        <div class="flex:1 lines:1">
          <h3 class="f:bold fg:white f:18@md" title="陳約翰 - 不過就這樣">
            陳約翰 - 不過就這樣
          </h3>
        </div>
        <div
          class="rel flex w:120 h:60 overflow:hidden bg:black b:3|solid|#333 rounded {content:'';abs;top:1/2;left:1/2;w:3;h:30;bg:#333;translate(-50%,-50%)}::before"
        >
          <button
            class="flex center-content w:1/2 h:full bg:white/.1:hover"
            type="button"
            @click="showEditForm = true"
          ></button>
          <button
            class="flex center-content w:1/2 h:full bg:white/.1:hover"
            type="button"
          ></button>
        </div>
      </div>
    </li>
    <li>
      <div
        class="rel flex jc:space-between ai:center gap-x:20 h:80 pl:30 pr:10 bg:black rounded"
      >
        <div class="flex:1 lines:1">
          <h3 class="f:bold fg:white f:18@md" title="陳約翰 - 秘密基地">
            陳約翰 - 秘密基地
          </h3>
        </div>
        <div
          class="rel flex w:120 h:60 overflow:hidden bg:black b:3|solid|#333 rounded {content:'';abs;top:1/2;left:1/2;w:3;h:30;bg:#333;translate(-50%,-50%)}::before"
        >
          <button
            class="flex center-content w:1/2 h:full bg:white/.1:hover"
            type="button"
            @click="showEditForm = true"
          ></button>
          <button
            class="flex center-content w:1/2 h:full bg:white/.1:hover"
            type="button"
          ></button>
        </div>
      </div>
    </li>
  </ul>
</template>
