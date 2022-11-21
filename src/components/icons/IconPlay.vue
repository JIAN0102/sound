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
      d="M8.72154 2.54687C6.73333 1.15374 4 2.57604 4 5.00375V18.9965C4 21.4243 6.73336 22.8466 8.72156 21.4534L18.7297 14.4406C20.4229 13.2541 20.4229 10.746 18.7297 9.55955L8.72154 2.54687Z"
    />
  </svg>
</template>
