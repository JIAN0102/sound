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
      d="M6.7,0.5c-1.4-1-3.2-0.6-4.2,0.7C2.2,1.8,2,2.4,2,3v14c0,1.7,1.3,3,3,3c0.6,0,1.2-0.2,1.7-0.5l10-7c1.3-0.9,1.7-2.8,0.7-4.2C17.3,8,17,7.8,16.7,7.6L6.7,0.5z"
    />
  </svg>
</template>
