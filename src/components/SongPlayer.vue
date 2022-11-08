<script setup></script>

<template>
  <div
    class="fixed bottom:80 left:1/2 z:997 flex bg:black rounded translateX(-50%)"
  >
    <button
      class="rel w:140 h:80 mr:-30 bg:linear-gradient(to|right,primary,secondary) b:10|solid|black rl:9999"
      type="button"
    ></button>
    <div
      class="rel z:10 w:660 h:80 overflow:hidden f:bold fg:white bg:#333 b:10|solid|black rounded cursor:pointer"
    >
      <div
        class="abs top:0 left:0 w:45% h:full overflow:hidden bg:#777 rounded transform:left"
      >
        <div
          class="abs inset:0 bg:url('assets/img/progress-arrow.svg') @progress|1.5s|linear|infinite"
        ></div>
      </div>
      <div class="abs inset:0 pointer-events:none">
        <span class="abs top:1/2 left:30 translateY(-50%)">00:48</span>
        <span class="abs top:1/2 right:30 translateY(-50%)">03:26</span>
        <h2 class="abs top:1/2 left:1/2 f:18 translate(-50%,-50%)">
          【陳約翰】秘密基地
        </h2>
      </div>
    </div>
    <div
      class="rel w:140 h:80 ml:-30 overflow:hidden bg:#333 b:10|solid|black rr:9999 cursor:pointer"
    >
      <div
        class="abs top:0 left:0 w:80% h:full bg:#777 rr:9999 transform:left"
      ></div>
      <div
        class="abs top:1/2 left:30 w:24 h:24 bg:white round translateY(-50%)"
      ></div>
    </div>
  </div>
</template>
