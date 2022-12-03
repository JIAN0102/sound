<template>
  <div class="bg:black r:40 r:60@md">
    <div class="p:40|20|20 p:60|80|30@md">
      <slot name="header"></slot>
    </div>
    <div class="p:30|20 bg:#262626 r:40 {p:40;r:60}@md">
      <slot name="main"></slot>
    </div>
  </div>
</template>
