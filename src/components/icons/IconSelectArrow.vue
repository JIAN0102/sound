<script setup>
defineProps({
  width: {
    type: [String, Number],
    default: 24,
  },
  height: {
    type: [String, Number],
    default: 24,
  },
  color: {
    type: String,
    default: 'currentColor',
  },
});
</script>

<template>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    :width="width"
    :height="height"
    :fill="color"
  >
    <path
      d="M14.1,18.8c-0.7,1.2-2.3,1.6-3.4,0.8c-0.3-0.2-0.5-0.5-0.7-0.8L3.4,8C2.7,6.8,3,5.2,4.1,4.4C4.5,4.1,5,4,5.5,4h13.1C19.9,4,21,5.2,21,6.6c0,0.5-0.1,1-0.4,1.4L14.1,18.8z"
    />
  </svg>
</template>
