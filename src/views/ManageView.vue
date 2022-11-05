<script setup></script>

<template>
  <div
    class="grid-cols:1 gap-x:40 gap-y:30 p:80|20|120 {grid-cols:2;p:180|80|210}@md"
  >
    <div class="sticky top:180 left:0 as:flex-start">
      <div class="bg:black r:40 r:60@md">
        <div class="p:40|20|20 p:60|30|20@md">
          <h1 class="f:24 f:28@md fg:white t:center">陳約翰 - 秘密基地</h1>
        </div>
        <div
          class="p:30|20|20 bg:#333 r:40 {p:60|40|40;b:10|solid|black;r:60}@md"
        >
          <div class="grid-cols:3 t:center">
            <div>
              <h3 class="f:12 fg:#777 f:16@md">上傳者</h3>
              <h4 class="mt:4 f:bold f:16 fg:white f:24@md">陳建良</h4>
            </div>
            <div class="bl:3|solid|white/.2">
              <h3 class="f:12 fg:#777 f:16@md">長度</h3>
              <h4 class="mt:4 f:bold f:16 fg:white f:24@md">03:24</h4>
            </div>
            <div class="bl:3|solid|white/.2">
              <h3 class="f:12 fg:#777 f:16@md">曲風</h3>
              <h4 class="mt:4 f:bold f:16 fg:white f:24@md">饒舌</h4>
            </div>
          </div>
          <button
            class="rel w:full h:60 mt:40 f:bold f:20 bg:linear-gradient(to|right,#fd9d02,#f4db0d) rounded"
            type="button"
          >
            <span
              class="abs top:1/2 left:10 w:40 h:40 b:4|solid|black rounded translateY(-50%)"
            ></span>
            播放音樂
          </button>
        </div>
      </div>
    </div>

    <div>
      <div class="bg:black r:40 r:60@md">
        <div class="p:40|20|20 p:60|30|20@md">
          <h2 class="f:24 fg:white t:center f:28@md">撰寫評論</h2>
        </div>
        <div class="p:20 bg:#333 r:40 {p:40;b:10|solid|black;r:60}@md">
          <div class="rel">
            <select
              class="block w:full h:60 px:30 f:20 f:bold fg:white bg:black rounded appearance:none"
            >
              <option value="0">評論 (由新到舊)</option>
            </select>
          </div>
          <div class="h:200 mt:20 bg:black r:30"></div>
          <div class="h:200 mt:20 bg:black r:30"></div>
          <div class="h:200 mt:20 bg:black r:30"></div>
          <div class="h:200 mt:20 bg:black r:30"></div>
          <div class="h:200 mt:20 bg:black r:30"></div>
          <div class="h:200 mt:20 bg:black r:30"></div>
        </div>
      </div>
    </div>
  </div>
</template>
