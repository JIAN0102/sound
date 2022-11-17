<template>
  <div class="fixed inset:0 overflow:hidden pointer-events:none">
    <div
      class="abs inset:0 bg:repeating-linear-gradient(40deg,#262626,#262626|3px,#161616|3px,#161616|8px)"
    ></div>

    <div
      class="abs top:1/2 left:1/2 w:150% opacity:.04 translate(-50%,-50%)|rotate(-12.5) {h:30vh;bg:url('/assets/img/sound-text.svg');background-size:auto|100%}>div @scroll|12.5s|linear|infinite>div:odd @scroll|12.5s|linear|infinite|reverse>div:even"
    >
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>

    <div
      class="abs top:15% bottom:-15% left:1/2 translateX(-50%) bottom:-40%@xs bottom:-60%@md"
    >
      <img class="h:full" src="/assets/img/cd-character.png" alt="Character" />
    </div>
  </div>
</template>
