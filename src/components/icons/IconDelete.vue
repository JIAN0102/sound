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
      d="M2.3,2.3c0.4-0.4,1-0.4,1.4,0L10,8.6l6.3-6.3c0.4-0.4,1-0.4,1.4,0c0.4,0.4,0.4,1,0,1.4L11.4,10l6.3,6.3c0.4,0.4,0.4,1,0,1.4c-0.4,0.4-1,0.4-1.4,0L10,11.4l-6.3,6.3c-0.4,0.4-1,0.4-1.4,0c-0.4-0.4-0.4-1,0-1.4L8.6,10L2.3,3.7C1.9,3.3,1.9,2.7,2.3,2.3z"
    />
  </svg>
</template>
