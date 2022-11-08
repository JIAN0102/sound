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
        class="flex jc:center f:50vh {px:40;@scroll|12.5s|linear|infinite|reverse}>span"
      >
        <span>SOUND</span>
        <span>SOUND</span>
        <span>SOUND</span>
        <span>SOUND</span>
      </div>
      <div
        class="flex jc:center mt:-6.5vh f:25vh {px:20;@scroll|5s|linear|infinite}>span"
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
        class="flex jc:center mt:-10vh f:50vh {px:40;@scroll|7.5s|linear|infinite|reverse}>span"
      >
        <span>SOUND</span>
        <span>SOUND</span>
        <span>SOUND</span>
        <span>SOUND</span>
      </div>
      <div
        class="flex jc:center mt:-6.5vh f:25vh {px:20;@scroll|2.5s|linear|infinite}>span"
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
        class="flex jc:center mt:-10vh f:50vh {px:40;@scroll|10s|linear|infinite|reverse}>span"
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
        class="h:full @rotate|.75s|linear|infinite"
        src="assets/img/cd-character.png"
        alt="CD Cat"
      />
    </div>
    <div class="abs inset:0 bg:radial-gradient(transparent|60%,black/.6)"></div>
  </div>

  <svg
    class="hide! fixed top:0 left:0 z:9999 pointer-events:none hide@<md"
    xmlns="http://www.w3.org/2000/svg"
    width="100%"
    height="100%"
    viewBox="0 0 1920 1080"
    preserveAspectRatio="none"
  >
    <path
      d="M0,0V1080H1920V0ZM1860,1020c-17,17-402.944,30-900,30s-883-13-900-30S30,805.1,30,540,43,77,60,60,462.944,30,960,30s883,13,900,30,30,214.9,30,480S1877,1003,1860,1020Z"
    />
  </svg>
</template>
