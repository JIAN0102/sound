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
      d="M2,19c0-0.6,0.4-1,1-1h14c0.6,0,1,0.4,1,1s-0.4,1-1,1H3C2.4,20,2,19.6,2,19z"
    />
    <path
      d="M9.9,3.4c-0.2-0.2-0.5-0.2-0.7,0L5.4,7.2c-0.2,0.2-0.2,0.5,0,0.7l4.7,4.7c0.2,0.2,0.5,0.2,0.7,0l3.9-3.9c0.2-0.2,0.2-0.5,0-0.7L9.9,3.4z"
    />
    <path
      d="M8.6,14.5c0.2,0,0.2-0.2,0.1-0.4L3.9,9.3C3.7,9.2,3.5,9.2,3.5,9.4l0,0L2,14.6c-0.2,0.8,0.5,1.6,1.4,1.4L8.6,14.5L8.6,14.5z"
    />
    <path
      d="M11.7,0.9c1.2-1.2,3.1-1.2,4.2,0l1.2,1.2c1.2,1.2,1.2,3.1,0,4.2l-0.4,0.4c-0.2,0.2-0.5,0.2-0.7,0l-4.7-4.7c-0.2-0.2-0.2-0.5,0-0.7L11.7,0.9z"
    />
  </svg>
</template>
