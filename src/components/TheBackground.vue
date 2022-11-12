<template>
  <div class="fixed inset:0 overflow:hidden pointer-events:none">
    <div
      class="abs inset:0 bg:repeating-linear-gradient(40deg,#19191e,#19191e|3px,transparent|3px,transparent|8px)"
    ></div>

    <div class="abs inset:0 bg:linear-gradient(#333,transparent)"></div>

    <div
      class="abs top:1/2 left:1/2 w:full opacity:.03 translate(-50%,-50%)|skewY(-12.5) {bg:url('/assets/img/sound-text.svg');background-size:auto|100%}>div h:40vh>div:odd h:20vh>div:even"
    >
      <div class="@scroll|10s|linear|infinite"></div>
      <div class="@scrollReverse|12.5s|linear|infinite"></div>
      <div class="@scroll|15s|linear|infinite"></div>
      <div class="@scrollReverse|10s|linear|infinite"></div>
      <div class="@scroll|7.5s|linear|infinite"></div>
    </div>

    <!-- <div
      class="abs top:1/2 left:0 w:83.33333% mx:8.33333% font-family:countach f:15vw uppercase white-space:nowrap translateY(-50%)"
    >
      <div class="flex overflow:hidden">
        <div class="flex @marquee|50s|linear|infinite">
          <span
            class="inline-block fg:white white-space:nowrap {content:attr(data-text);fg:transparent;text-stroke:1|white}::after"
            data-text="Music that is lulled by poetic lyrics&nbsp;-&nbsp;"
            >Music that is lulled by poetic lyrics&nbsp;-&nbsp;</span
          >
          <span
            class="inline-block fg:transparent text-stroke:1|white white-space:nowrap {content:attr(data-text);fg:white;text-stroke:0}::before"
            data-text="Music that is lulled by poetic lyrics&nbsp;-&nbsp;"
            >Music that is lulled by poetic lyrics&nbsp;-&nbsp;</span
          >
        </div>
      </div>
    </div> -->

    <div
      class="abs top:15% bottom:-20% left:1/2 translateX(-50%) ~transform|.75s bottom:-60%@md"
    >
      <img
        class="h:full @rotate|1s|linear|infinit"
        src="/assets/img/cd-character.png"
        alt="Character"
      />
    </div>
  </div>
</template>
