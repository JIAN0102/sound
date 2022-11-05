<template>
  <div class="fixed inset:0 overflow:hidden pointer-events:none">
    <div class="abs inset:0 bg:linear-gradient(#282828,black)"></div>
    <div
      class="abs inset:0 bg:repeating-linear-gradient(40deg,#19191e,#19191e|3px,transparent|3px,transparent|8px)"
    ></div>
    <div
      class="abs top:1/2 left:1/2 opacity:.03 translate(-50%,-50%)|rotate(-15deg) mt:-9vh>div~div"
    >
      <div
        class="flex font-family:countach f:bold f:50vh fg:white lh:1 white-space:nowrap {px:40;animation:scroll|7.5s|linear|infinite}>span"
      >
        <span>SOUND</span>
        <span>SOUND</span>
        <span>SOUND</span>
        <span>SOUND</span>
      </div>
      <div
        class="flex font-family:countach f:bold f:50vh fg:white lh:1 white-space:nowrap {px:40;animation:scroll|7.5s|linear|infinite|reverse}>span"
      >
        <span>SOUND</span>
        <span>SOUND</span>
        <span>SOUND</span>
        <span>SOUND</span>
      </div>
      <div
        class="flex font-family:countach f:bold f:50vh fg:white lh:1 white-space:nowrap {px:40;animation:scroll|7.5s|linear|infinite}>span"
      >
        <span>SOUND</span>
        <span>SOUND</span>
        <span>SOUND</span>
        <span>SOUND</span>
      </div>
      <div
        class="flex font-family:countach f:bold f:50vh fg:white lh:1 white-space:nowrap {px:40;animation:scroll|7.5s|linear|infinite|reverse}>span"
      >
        <span>SOUND</span>
        <span>SOUND</span>
        <span>SOUND</span>
        <span>SOUND</span>
      </div>
    </div>
    <div
      class="abs top:120 bottom:-200 left:1/2 translateX(-50%) {top:160;bottom:-400}@md"
    >
      <img
        class="h:full @rotate|.75s|linear|infinite"
        src="assets/img/cd-character.svg"
        alt="CD Cat"
      />
    </div>
  </div>

  <svg
    class="fixed top:0 left:0 z:998"
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
