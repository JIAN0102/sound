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
      d="M12.4615 4C11.1021 4 10 5.10207 10 6.46154V17C10 18.6569 11.3431 20 13 20H16C19.3137 20 22 17.3137 22 14C22 11.3354 20.263 9.07646 17.8596 8.29374C17.2948 5.8343 15.0924 4 12.4615 4Z"
    />
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M7 9C6.44772 9 6 9.44771 6 10V19C6 19.5523 6.44772 20 7 20C7.55228 20 8 19.5523 8 19V10C8 9.44772 7.55228 9 7 9ZM3 13C2.44772 13 2 13.4477 2 14V19C2 19.5523 2.44772 20 3 20C3.55228 20 4 19.5523 4 19V14C4 13.4477 3.55228 13 3 13Z"
    />
  </svg>
</template>
