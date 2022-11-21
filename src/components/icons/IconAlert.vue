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
      d="M10,2c-4.42,0-8,3.58-8,8c0,4.42,3.58,8,8,8c4.42,0,8-3.58,8-8C18,5.58,14.42,2,10,2z M0,10C0,4.48,4.48,0,10,0c5.52,0,10,4.48,10,10c0,5.52-4.48,10-10,10C4.48,20,0,15.52,0,10z"
    />
    <path
      d="M11,6c0-0.55-0.45-1-1-1S9,5.45,9,6v4c0,0.55,0.45,1,1,1s1-0.45,1-1V6z"
    />
    <path
      d="M10,13c-0.55,0-1,0.45-1,1c0,0.55,0.45,1,1,1s1-0.45,1-1C11,13.45,10.55,13,10,13z"
    />
  </svg>
</template>
