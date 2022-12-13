import { ref } from 'vue';

export function useSlider(options) {
  const dragging = ref(false);
  const sliderRef = ref(null);

  function onSliderDown(event) {
    event.preventDefault();
    onDragStart(event);

    window.addEventListener('mousemove', onDragging);
    window.addEventListener('touchmove', onDragging);
    window.addEventListener('mouseup', onDragEnd);
    window.addEventListener('touchend', onDragEnd);
  }

  function getClientX(event) {
    let clientX;

    if (event.type.startsWith('touch')) {
      clientX = event.touches[0].clientX;
    } else {
      clientX = event.clientX;
    }

    return clientX;
  }

  function onDragStart(event) {
    dragging.value = true;

    if (options.onDragStartEvent) options.onDragStartEvent();

    const clientX = getClientX(event);
    const sliderSize = sliderRef.value?.clientWidth;
    const sliderOffsetLeft = sliderRef.value?.getBoundingClientRect().left;
    const newPercent = (clientX - sliderOffsetLeft) / sliderSize;

    options.updatePercent(newPercent);
  }

  function onDragging(event) {
    if (dragging.value) {
      const clientX = getClientX(event);
      const sliderSize = sliderRef.value?.clientWidth;
      const sliderOffsetLeft = sliderRef.value?.getBoundingClientRect().left;
      let newPercent = (clientX - sliderOffsetLeft) / sliderSize;

      if (newPercent < 0) {
        newPercent = 0;
      } else if (newPercent > 1) {
        newPercent = 1;
      }

      options.updatePercent(newPercent);
    }
  }

  function onDragEnd() {
    if (dragging.value) {
      dragging.value = false;

      if (options.onDragEndEvent) options.onDragEndEvent();

      window.removeEventListener('mousemove', onDragging);
      window.removeEventListener('touchmove', onDragging);
    }
  }

  return {
    sliderRef,
    onSliderDown,
  };
}
