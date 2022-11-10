<script setup>
import { useRoute } from 'vue-router';

const route = useRoute();
</script>

<template>
  <div class="fixed inset:0 overflow:hidden pointer-events:none">
    <div
      class="abs inset:0 bg:repeating-linear-gradient(40deg,#19191e,#19191e|3px,transparent|3px,transparent|8px)"
    ></div>
    <div class="abs inset:0 bg:linear-gradient(#333,transparent)"></div>
    <div
      class="abs top:1/2 left:1/2 w:full opacity:.03 translate(-50%,-50%)|skewY(-12.5) {bg:url('/assets/img/sound-text.svg');background-size:auto|100%}>div h:40vh>div:odd h:20vh>div:even"
    >
      <div class="@scroll|12.5s|linear|infinite"></div>
      <div class="@scrollReverse|5s|linear|infinite"></div>
      <div class="@scroll|7.5s|linear|infinite"></div>
      <div class="@scrollReverse|2.5s|linear|infinite"></div>
      <div class="@scroll|15s|linear|infinite"></div>
    </div>
    <div
      class="abs top:1/2 left:1/2 font-family:countach f:bold f:75vh fg:white lh:1 text-stroke:2|white white-space:nowrap translate(-50%,-50%)|skewY(-15)"
    ></div>
    <div
      class="abs top:15% bottom:-20% left:1/2 translateX(-50%) ~transform|.75s bottom:-60%@md"
      :class="{ 'translate(-50%,25%)|rotate(15deg)!': route.name !== 'home' }"
    >
      <img
        class="h:full @rotate|.75s|linear|infinit"
        src="/assets/img/cd-character.png"
        alt="CD Cat"
      />
    </div>
  </div>
</template>
