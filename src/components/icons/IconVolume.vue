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
      d="M14.3,2.3C13.8,2.2,13.2,2.5,13,3c-0.2,0.5,0.1,1.1,0.7,1.2C16.2,5,18,7.3,18,10c0,2.7-1.8,5-4.3,5.8c-0.5,0.2-0.8,0.7-0.7,1.2c0.2,0.5,0.7,0.8,1.2,0.7c3.3-1,5.7-4,5.7-7.7C20,6.4,17.6,3.3,14.3,2.3z"
    />
    <path
      d="M14.7,7.3c-0.4-0.4-1-0.4-1.4,0c-0.4,0.4-0.4,1,0,1.4C13.8,9.2,14,9.4,14,10c0,0.6-0.2,0.8-0.7,1.3c-0.4,0.4-0.4,1,0,1.4c0.4,0.4,1,0.4,1.4,0l0,0c0.5-0.5,1.3-1.3,1.3-2.7C16,8.6,15.2,7.8,14.7,7.3L14.7,7.3z"
    />
    <path
      d="M11,4c0-1.7-2-2.6-3.3-1.5L3.6,6H2C0.9,6,0,6.9,0,8v4c0,1.1,0.9,2,2,2h1.6l4.1,3.5C9,18.6,11,17.7,11,16V4z"
    />
  </svg>
</template>
