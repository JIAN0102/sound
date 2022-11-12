<script setup>
defineProps({
  upload: {
    type: Object,
    required: true,
  },
});
</script>

<template>
  <li :class="upload.class">
    <span class="f:14 fg:white f:16@md">{{ upload.name }}</span>
    <div class="rel h:40 mt:8 bg:#555 rounded">
      <div
        class="abs top:0 left:0 h:full overflow:hidden bg:#777 rounded ~width|.1s .is-error_{bg:danger} .is-uploaded_{bg:linear-gradient(to|right,primary,secondary)}"
        :style="{ width: `${upload.currentProgress}%` }"
      >
        <div
          class="abs inset:0 bg:url('/assets/img/progress-arrow.svg') background-size:50|40 @progress|1.5s|linear|infinite"
        ></div>
      </div>
    </div>
  </li>
</template>
