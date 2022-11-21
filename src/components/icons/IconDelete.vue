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
      d="M4.3,4.3c0.4-0.4,1-0.4,1.4,0l6.3,6.3l6.3-6.3c0.4-0.4,1-0.4,1.4,0c0.4,0.4,0.4,1,0,1.4L13.4,12l6.3,6.3c0.4,0.4,0.4,1,0,1.4c-0.4,0.4-1,0.4-1.4,0L12,13.4l-6.3,6.3c-0.4,0.4-1,0.4-1.4,0c-0.4-0.4-0.4-1,0-1.4l6.3-6.3L4.3,5.7C3.9,5.3,3.9,4.7,4.3,4.3z"
    />
  </svg>
</template>
