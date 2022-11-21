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
      d="M7,12c-2.8,0-5,2.2-5,5c0,1.7,1.3,3,3,3h10c1.7,0,3-1.3,3-3c0-2.8-2.2-5-5-5H7z"
    />
    <path d="M10,0C7.2,0,5,2.2,5,5s2.2,5,5,5c2.8,0,5-2.2,5-5S12.8,0,10,0z" />
  </svg>
</template>
