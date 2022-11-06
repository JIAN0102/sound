<script setup>
import BaseCard from '@/components/base/BaseCard.vue';
</script>

<template>
  <div class="grid-cols:1 gap:30|40 p:80|0|210 p:180|80|210@md grid-cols:2@lg">
    <div>
      <BaseCard>
        <template #header>
          <h1 class="f:bold f:24 fg:white t:center f:28@md">
            陳約翰 - 秘密基地
          </h1>
        </template>

        <template #main>
          <div
            class="rel grid-cols:3 t:center {content:'';abs;top:1/2;left:0;w:3;h:30;bg:#777;translateY(-50%)}>div~div::before"
          >
            <div class="rel">
              <span class="f:12 fg:#777 f:16@md">上傳者</span>
              <h3 class="mt:4 f:bold fg:white f:24@md">陳建良</h3>
            </div>
            <div class="rel">
              <span class="f:12 fg:#777 f:16@md">長度</span>
              <h3 class="mt:4 f:bold fg:white f:24@md">03:24</h3>
            </div>
            <div class="rel">
              <span class="f:12 fg:#777 f:16@md">曲風</span>
              <h3 class="mt:4 f:bold fg:white f:24@md">饒舌</h3>
            </div>
          </div>
          <button
            class="rel w:full h:60 mt:20 f:bold f:18 bg:linear-gradient(to|right,primary,secondary) rounded mt:30@md @bounce|1s|infinite:hover"
          >
            <span
              class="abs top:1/2 left:10 w:40 h:40 b:4|solid|black rounded translateY(-50%)"
            ></span>
            播放音樂
          </button>
        </template>
      </BaseCard>
    </div>

    <div>
      <BaseCard>
        <template #header>
          <h2 class="f:bold f:24 fg:white t:center {f:28;t:left}@md">
            撰寫評論
          </h2>
        </template>

        <template #main>
          <div class="rel">
            <select
              class="block w:full h:60 px:30 fg:white bg:black rounded outline:0 appearance:none b:#777:focus"
            >
              <option value="0">評論 (由新到舊)</option>
            </select>
          </div>
          <div class="rel mt:20">
            <textarea
              class="block w:full h:200 p:30 fg:white bg:black r:30 outline:0 resize:none b:#777:focus fg:#777::placeholder"
              placeholder="發表你對這首歌的感受吧！"
            ></textarea>
            <div
              class="abs bottom:0 left:1/2 flex w:240 h:60 overflow:hidden bg:black b:3|solid|#333 rounded translate(-50%,50%) {content:'';abs;top:1/2;left:1/2;w:3;h:30;bg:#333;translate(-50%,-50%)}::before"
            >
              <button
                class="flex center-content w:1/2 h:full fg:white bg:white/.1:hover"
                type="button"
              >
                送出
              </button>
              <button
                class="flex center-content w:1/2 h:full fg:white bg:white/.1:hover"
                type="button"
              >
                清空
              </button>
            </div>
          </div>
          <div class="mt:50>div:first mt:20>div~div">
            <div class="p:30 bg:black r:30">
              <div class="flex ai:flex-end gap-x:8">
                <h3 class="f:bold fg:white f:18@md">建良</h3>
                <span class="f:12 fg:#777 f:14@md">2022/06/20 下午10:01</span>
              </div>
              <div class="mt:20 f:14 fg:white lh:1.75 f:16@md">
                <p>
                  我的秘密基地 歡迎你的光臨<br />
                  卸下生活壓力 哼著這段旋律<br />
                  就讓這份愜意 增添生活情趣<br />
                  你也是顆流星 正在燃燒自己
                </p>
              </div>
            </div>
          </div>
        </template>
      </BaseCard>
    </div>
  </div>
</template>
