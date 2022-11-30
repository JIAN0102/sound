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
      d="M8,5C6.3,5,5,6.3,5,8v8c0,1.7,1.3,3,3,3h8c1.7,0,3-1.3,3-3v-3c0-0.6,0.4-1,1-1s1,0.4,1,1v3c0,2.8-2.2,5-5,5H8c-2.8,0-5-2.2-5-5V8c0-2.8,2.2-5,5-5h3c0.6,0,1,0.4,1,1s-0.4,1-1,1H8z"
    />
    <path
      d="M20.9,3.6c-0.1-0.2-0.3-0.4-0.5-0.5C20.2,3,20.1,3,19.9,3H16c-0.6,0-1,0.4-1,1s0.4,1,1,1h1.6l-6.3,6.3c-0.4,0.4-0.4,1,0,1.4c0.2,0.2,0.5,0.3,0.7,0.3s0.5-0.1,0.7-0.3L19,6.4V8c0,0.6,0.4,1,1,1s1-0.4,1-1V4C21,3.9,21,3.7,20.9,3.6z"
    />
  </svg>
</template>
