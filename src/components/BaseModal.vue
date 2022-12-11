<template>
  <div
    class="fixed inset:0 z:1000 overflow-x:hidden overflow-y:auto bg:repeating-linear-gradient(40deg,white/.1,white/.1|3px,white/.05|3px,white/.05|8px) bd:blur(10)"
  >
    <div class="flex ai:center max-w:600 min-h:calc(100%-120px) m:60|auto">
      <div
        class="rel w:full :is(.fade-enter-active,.fade-leave-active)_{~transform|.3s} :is(.fade-enter-from,.fade-leave-to)_{translateY(15%)}"
      >
        <slot name="button"></slot>
        <div class="bg:#030303 r:40 r:60@md">
          <div class="p:40|20|20 p:60|80|30@md">
            <slot name="header"></slot>
          </div>
          <div class="p:30|20 bg:#212121 r:40 {p:40;r:60}@md">
            <slot name="body"></slot>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
