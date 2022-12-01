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
    default: 'white',
  },
});
</script>

<template>
  <div
    class="b:2 round @rotate|.5s|linear|infinite"
    :class="`w:${width} h:${height} by:${color} bx:${color}/.4`"
  ></div>
</template>
