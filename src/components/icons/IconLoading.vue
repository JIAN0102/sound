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
    class="@rotate|.5s|linear|infinite"
  >
    <path d="M12,0v1c6.1,0,11,4.9,11,11h1C24,5.4,18.6,0,12,0z" />
    <path
      d="M12,23v1c6.6,0,12-5.4,12-12h-1C23,18.1,18.1,23,12,23z"
      opacity="0.4"
    />
    <path d="M1,12H0c0,6.6,5.4,12,12,12v-1C5.9,23,1,18.1,1,12z" />
    <path d="M12,1V0C5.4,0,0,5.4,0,12h1C1,5.9,5.9,1,12,1z" opacity="0.4" />
  </svg>
</template>
