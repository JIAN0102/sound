<script setup>
defineProps({
  width: {
    type: [String, Number],
    default: 28,
  },
  height: {
    type: [String, Number],
    default: 10,
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
    viewBox="0 0 28 10"
    :width="width"
    :height="height"
    :stroke="color"
  >
    <path
      d="M0.004294,9.002505 C4.01288321,9.002505 3.0100046,0.998668656 7,0.998668656 C10.9899954,0.998668656 10.0129089,9.002505 14,9.002505 C17.9870911,9.002505 16.990152,0.998668656 21,0.998668656 C25.009848,0.998668656 23.9731573,9.002505 28,9.002505"
      stroke-width="1.5"
    ></path>
  </svg>
</template>
