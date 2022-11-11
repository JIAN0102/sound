<template>
  <div class="rel h:4 overflow:hidden bg:#777 rounded">
    <div
      class="abs inset:0 transform:left @primaryIndeterminateTranslate|2s|linear|infinite"
    >
      <span
        class="abs inset:0 bg:linear-gradient(to|right,primary,secondary) @primaryIndeterminateScale|2s|linear|infinite"
      ></span>
    </div>
    <div
      class="abs inset:0 transform:left @auxiliaryIndeterminateTranslate|2s|linear|infinite"
    >
      <span
        class="abs inset:0 bg:linear-gradient(to|right,primary,secondary) @auxiliaryIndeterminateScale|2s|linear|infinite"
      ></span>
    </div>
  </div>
</template>
