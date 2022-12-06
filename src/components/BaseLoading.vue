<template>
  <div class="rel w:28 h:28">
    <div class="full @container-rotate|1.568s|linear|infinite">
      <div
        class="abs inset:0 fg:white white-space:nowrap opacity:0 @name:fill-unfill-rotate,layer-1-fade-in-out @duration:5.332s @easing:cubic-bezier(.4,0,.2,1) @iteration-count:infinite"
      >
        <div class="rel inline-block w:1/2 h:full overflow:hidden">
          <div
            class="abs top:0 bottom:0 left:0 w:200% b:3|solid br:transparent! bb:transparent! round rotate(129) @left-spin|1.333s|cubic-bezier(.4,0,.2,1)|infinite"
          ></div>
        </div>
        <div class="rel inline-block w:1/2 h:full overflow:hidden">
          <div
            class="abs top:0 bottom:0 left:-100% w:200% b:3|solid bb:transparent! bl:transparent! round rotate(-129) @right-spin|1.333s|cubic-bezier(.4,0,.2,1)|infinite"
          ></div>
        </div>
      </div>
      <div
        class="abs inset:0 fg:white white-space:nowrap opacity:0 @name:fill-unfill-rotate,layer-2-fade-in-out @duration:5.332s @easing:cubic-bezier(.4,0,.2,1) @iteration-count:infinite"
      >
        <div class="rel inline-block w:1/2 h:full overflow:hidden">
          <div
            class="abs top:0 bottom:0 left:0 w:200% b:3|solid br:transparent! bb:transparent! round rotate(129) @left-spin|1.333s|cubic-bezier(.4,0,.2,1)|infinite"
          ></div>
        </div>
        <div class="rel inline-block w:1/2 h:full overflow:hidden">
          <div
            class="abs top:0 bottom:0 left:-100% w:200% b:3|solid bb:transparent! bl:transparent! round rotate(-129) @right-spin|1.333s|cubic-bezier(.4,0,.2,1)|infinite"
          ></div>
        </div>
      </div>
      <div
        class="abs inset:0 fg:white white-space:nowrap opacity:0 @name:fill-unfill-rotate,layer-3-fade-in-out @duration:5.332s @easing:cubic-bezier(.4,0,.2,1) @iteration-count:infinite"
      >
        <div class="rel inline-block w:1/2 h:full overflow:hidden">
          <div
            class="abs top:0 bottom:0 left:0 w:200% b:3|solid br:transparent! bb:transparent! round rotate(129) @left-spin|1.333s|cubic-bezier(.4,0,.2,1)|infinite"
          ></div>
        </div>
        <div class="rel inline-block w:1/2 h:full overflow:hidden">
          <div
            class="abs top:0 bottom:0 left:-100% w:200% b:3|solid bb:transparent! bl:transparent! round rotate(-129) @right-spin|1.333s|cubic-bezier(.4,0,.2,1)|infinite"
          ></div>
        </div>
      </div>
      <div
        class="abs inset:0 fg:white white-space:nowrap opacity:0 @name:fill-unfill-rotate,layer-4-fade-in-out @duration:5.332s @easing:cubic-bezier(.4,0,.2,1) @iteration-count:infinite"
      >
        <div class="rel inline-block w:1/2 h:full overflow:hidden">
          <div
            class="abs top:0 bottom:0 left:0 w:200% b:3|solid br:transparent! bb:transparent! round rotate(129) @left-spin|1.333s|cubic-bezier(.4,0,.2,1)|infinite"
          ></div>
        </div>
        <div class="rel inline-block w:1/2 h:full overflow:hidden">
          <div
            class="abs top:0 bottom:0 left:-100% w:200% b:3|solid bb:transparent! bl:transparent! round rotate(-129) @right-spin|1.333s|cubic-bezier(.4,0,.2,1)|infinite"
          ></div>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
.spinner-layer.tp-yt-paper-spinner {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0;
  white-space: nowrap;
  color: white;
}

.layer-1.tp-yt-paper-spinner {
  color: white;
}

.spinner-layer.tp-yt-paper-spinner {
  animation-name: fill-unfill-rotate;
  animation-duration: 5332ms;
  animation-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  animation-iteration-count: infinite;
  opacity: 1;
}

.spinner-layer.layer-1.tp-yt-paper-spinner {
  animation-name: fill-unfill-rotate, layer-1-fade-in-out;
}

.spinner-layer.layer-2.tp-yt-paper-spinner {
  animation-name: fill-unfill-rotate, layer-2-fade-in-out;
}

.spinner-layer.layer-3.tp-yt-paper-spinner {
  animation-name: fill-unfill-rotate, layer-3-fade-in-out;
}

.spinner-layer.layer-4.tp-yt-paper-spinner {
  animation-name: fill-unfill-rotate, layer-4-fade-in-out;
}

.circle-clipper.tp-yt-paper-spinner {
  display: inline-block;
  position: relative;
  width: 50%;
  height: 100%;
  overflow: hidden;
}

.spinner-layer.tp-yt-paper-spinner::after,
.circle-clipper.tp-yt-paper-spinner .circle.tp-yt-paper-spinner {
  box-sizing: border-box;
  position: absolute;
  top: 0;
  border-width: 2px;
  border-radius: 50%;
}

.circle-clipper.tp-yt-paper-spinner .circle.tp-yt-paper-spinner {
  bottom: 0;
  width: 200%;
  border-style: solid;
  border-bottom-color: transparent !important;
}

.circle-clipper.left.tp-yt-paper-spinner .circle.tp-yt-paper-spinner {
  left: 0;
  border-right-color: transparent !important;
  transform: rotate(129deg);
}

.gap-patch.tp-yt-paper-spinner::after,
.circle-clipper.tp-yt-paper-spinner .circle.tp-yt-paper-spinner {
  animation-duration: 1333ms;
  animation-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  animation-iteration-count: infinite;
}

.circle-clipper.left.tp-yt-paper-spinner .circle.tp-yt-paper-spinner {
  animation-name: left-spin;
}

.circle-clipper.right.tp-yt-paper-spinner .circle.tp-yt-paper-spinner {
  left: -100%;
  border-left-color: transparent !important;
  transform: rotate(-129deg);
}

.circle-clipper.right.tp-yt-paper-spinner .circle.tp-yt-paper-spinner {
  animation-name: right-spin;
}
</style>
