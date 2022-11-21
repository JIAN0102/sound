<script setup>
defineProps({
  width: {
    type: [String, Number],
    default: 20,
  },
  height: {
    type: [String, Number],
    default: 20,
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
    viewBox="0 0 20 20"
    :width="width"
    :height="height"
    :fill="color"
  >
    <path
      d="M15.7,7.3c-0.4-0.4-1-0.4-1.4,0c-0.4,0.4-0.4,1,0,1.4l1.3,1.3l-1.3,1.3c-0.4,0.4-0.4,1,0,1.4c0.4,0.4,1,0.4,1.4,0l1.3-1.3l1.3,1.3c0.4,0.4,1,0.4,1.4,0c0.4-0.4,0.4-1,0-1.4L18.4,10l1.3-1.3c0.4-0.4,0.4-1,0-1.4c-0.4-0.4-1-0.4-1.4,0L17,8.6L15.7,7.3z"
    />
    <path
      d="M11,4c0-1.7-2-2.6-3.3-1.5L3.6,6H2C0.9,6,0,6.9,0,8v4c0,1.1,0.9,2,2,2h1.6l4.1,3.5C9,18.6,11,17.7,11,16V4z"
    />
  </svg>
</template>
