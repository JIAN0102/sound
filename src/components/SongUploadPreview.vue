<script setup>
defineProps({
  upload: {
    type: Object,
    required: true,
  },
});
</script>

<template>
  <div :class="upload.class">
    <h3 class="f:14 fg:white f:16@md">
      {{ upload.name }}
      <span v-if="upload.class === 'is-uploaded'" class="fg:primary"
        >(上傳成功)</span
      >
      <span v-if="upload.class === 'is-error'" class="fg:danger"
        >(上傳失敗)</span
      >
    </h3>
    <div class="rel h:40 mt:8 bg:#212121 rounded">
      <div
        class="abs top:0 left:0 h:full overflow:hidden bg:#696969 rounded ~width|.1s .is-uploaded_{bg:linear-gradient(to|right,secondary,primary)} .is-error_{bg:danger}"
        :style="{ width: `${upload.currentProgress}%` }"
      >
        <div
          class="abs inset:0 bg:url('/assets/img/progress-arrow.svg') background-size:50|40 @progress|1.5s|linear|infinite"
        ></div>
      </div>
    </div>
  </div>
</template>
