<script setup></script>

<template>
  <div class="fixed inset:0 overflow:hidden pointer-events:none">
    <div
      class="abs inset:0 bg:repeating-linear-gradient(40deg,#19191e,#19191e|3px,transparent|3px,transparent|8px)"
    ></div>
    <div class="abs inset:0 bg:linear-gradient(#333,transparent)"></div>
    <div
      class="abs top:1/2 left:1/2 font-family:countach f:bold fg:#e3e3e3 lh:1 white-space:nowrap opacity:.04 translate(-50%,-50%)|skewY(-12.5)"
    >
      <div
        class="flex jc:center f:50vh {px:40;animation:scroll|12.5s|linear|infinite|reverse}>span"
      >
        <span>SOUND</span>
        <span>SOUND</span>
        <span>SOUND</span>
        <span>SOUND</span>
      </div>
      <div
        class="flex jc:center mt:-6.5vh f:25vh {px:20;animation:scroll|5s|linear|infinite}>span"
      >
        <span>SOUND</span>
        <span>SOUND</span>
        <span>SOUND</span>
        <span>SOUND</span>
        <span>SOUND</span>
        <span>SOUND</span>
        <span>SOUND</span>
        <span>SOUND</span>
      </div>
      <div
        class="flex jc:center mt:-10vh f:50vh {px:40;animation:scroll|7.5s|linear|infinite|reverse}>span"
      >
        <span>SOUND</span>
        <span>SOUND</span>
        <span>SOUND</span>
        <span>SOUND</span>
      </div>
      <div
        class="flex jc:center mt:-6.5vh f:25vh {px:20;animation:scroll|2.5s|linear|infinite}>span"
      >
        <span>SOUND</span>
        <span>SOUND</span>
        <span>SOUND</span>
        <span>SOUND</span>
        <span>SOUND</span>
        <span>SOUND</span>
        <span>SOUND</span>
        <span>SOUND</span>
      </div>
      <div
        class="flex jc:center mt:-10vh f:50vh {px:40;animation:scroll|10s|linear|infinite|reverse}>span"
      >
        <span>SOUND</span>
        <span>SOUND</span>
        <span>SOUND</span>
        <span>SOUND</span>
      </div>
    </div>
    <div
      class="abs top:15% bottom:-20% left:1/2 translateX(-50%) ~transform|1s bottom:-60%@md"
    >
      <img
        class="h:full @rotate|.75s|linear|infinit"
        src="assets/img/cd-character.png"
        alt="CD Cat"
      />
    </div>
    <div class="abs inset:0 bg:radial-gradient(transparent|60%,black/.6)"></div>
  </div>
</template>
