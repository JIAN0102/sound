<script setup>
import { RouterLink } from 'vue-router';
</script>

<template>
  <div
    class="mt:100vh px:20 pb:210 bg:linear-gradient(transparent,white/.25) px:80@md"
  >
    <div
      class="grid-cols:1 gap:40 grid-cols:9@xs grid-cols:13@lg grid-col-start:2>div:nth(4n+3)@xs&<lg grid-col-start:2>div:nth(6n+4)@lg"
    >
      <div class="grid-col-span:4@xs">
        <RouterLink
          class="block h:80 bg:black rounded"
          :to="{ name: 'song' }"
        ></RouterLink>
      </div>
      <div class="grid-col-span:4@xs">
        <RouterLink
          class="block h:80 bg:black rounded"
          :to="{ name: 'song' }"
        ></RouterLink>
      </div>
      <div class="grid-col-span:4@xs">
        <RouterLink
          class="block h:80 bg:black rounded"
          :to="{ name: 'song' }"
        ></RouterLink>
      </div>
      <div class="grid-col-span:4@xs">
        <RouterLink
          class="block h:80 bg:black rounded"
          :to="{ name: 'song' }"
        ></RouterLink>
      </div>
    </div>
  </div>
</template>
