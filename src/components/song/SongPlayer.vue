<script setup></script>

<template>
  <div
    class="fixed bottom:80 left:1/2 z:999 flex bg:black rounded translateX(-50%)"
  >
    <button
      class="rel w:140 h:80 mr:-30 bg:linear-gradient(to|right,#fd9d02,#f4db0d) b:10|solid|black rl:9999"
      type="button"
    ></button>
    <div
      class="rel z:10 w:660 h:80 overflow:hidden f:bold fg:white bg:#333 b:10|solid|black rounded"
    >
      <div
        class="abs top:0 left:0 full bg:#777 transform:left scaleX(.4)"
      ></div>
      <span class="abs top:1/2 left:30 translateY(-50%)">00:48</span>
      <span class="abs top:1/2 right:30 translateY(-50%)">03:26</span>
      <h2 class="abs top:1/2 left:1/2 f:20 translate(-50%,-50%)">
        【陳約翰】秘密基地
      </h2>
    </div>
    <button
      class="rel w:140 h:80 ml:-30 overflow:hidden bg:#333 b:10|solid|black rr:9999"
      type="button"
    >
      <div
        class="abs top:0 left:0 full bg:#777 transform:left scaleX(.4)"
      ></div>
      <div
        class="abs top:1/2 left:30 w:24 h:24 bg:white round translateY(-50%)"
      ></div>
    </button>
  </div>
</template>
