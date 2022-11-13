<template>
  <div class="fixed inset:0 overflow:hidden pointer-events:none">
    <div
      class="abs inset:0 bg:repeating-linear-gradient(40deg,#19191e,#19191e|3px,transparent|3px,transparent|8px)"
    ></div>

    <div class="abs inset:0 bg:linear-gradient(#282828,transparent)"></div>

    <div
      class="abs top:1/2 left:1/2 w:150% opacity:.03 translate(-50%,-50%)|rotate(-12.5) {h:30vh;bg:url('/assets/img/sound-text.svg');background-size:auto|100%}>div @scroll|15s|linear|infinite>div:odd @scroll|15s|linear|infinite|reverse>div:even"
    >
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>

    <div
      class="abs top:15% bottom:-20% left:1/2 translateX(-50%) ~transform|.75s bottom:-60%@md"
    >
      <img
        class="h:full @rotate|1s|linear|infinit"
        src="/assets/img/cd-character.png"
        alt="Character"
      />
    </div>
  </div>
</template>
