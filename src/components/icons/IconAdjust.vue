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
    <path d="M2 7C2 6.44772 2.44772 6 3 6H7V8H3C2.44772 8 2 7.55228 2 7Z" />
    <path
      d="M3 16C2.44772 16 2 16.4477 2 17C2 17.5523 2.44772 18 3 18H15V16H3Z"
    />
    <path
      d="M17 16V18H21C21.5523 18 22 17.5523 22 17C22 16.4477 21.5523 16 21 16H17Z"
    />
    <path
      d="M9 6V8H21C21.5523 8 22 7.55228 22 7C22 6.44772 21.5523 6 21 6H9Z"
    />
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M11 7C11 8.65685 9.65685 10 8 10C6.34315 10 5 8.65685 5 7C5 5.34315 6.34315 4 8 4C9.65685 4 11 5.34315 11 7ZM9 7C9 7.55228 8.55228 8 8 8C7.44772 8 7 7.55228 7 7C7 6.44772 7.44772 6 8 6C8.55228 6 9 6.44772 9 7Z"
    />
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M19 17C19 18.6569 17.6569 20 16 20C14.3431 20 13 18.6569 13 17C13 15.3431 14.3431 14 16 14C17.6569 14 19 15.3431 19 17ZM17 17C17 17.5523 16.5523 18 16 18C15.4477 18 15 17.5523 15 17C15 16.4477 15.4477 16 16 16C16.5523 16 17 16.4477 17 17Z"
    />
  </svg>
</template>
