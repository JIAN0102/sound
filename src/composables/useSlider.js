import { ref } from 'vue';

export function useSlider(emit) {
  const dragging = ref(false);
  const slider = ref(null);

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
    emit('drag-start');

    dragging.value = true;

    const clientX = getClientX(event);
    const sliderSize = slider.value?.clientWidth;
    const sliderOffsetLeft = slider.value?.getBoundingClientRect().left;
    const newPercent = (clientX - sliderOffsetLeft) / sliderSize;

    emit('update', newPercent);
  }

  function onDragging(event) {
    if (dragging.value) {
      const clientX = getClientX(event);
      const sliderSize = slider.value?.clientWidth;
      const sliderOffsetLeft = slider.value?.getBoundingClientRect().left;
      let newPercent = (clientX - sliderOffsetLeft) / sliderSize;

      if (newPercent < 0) {
        newPercent = 0;
      } else if (newPercent > 1) {
        newPercent = 1;
      }

      emit('update', newPercent);
    }
  }

  function onDragEnd() {
    if (dragging.value) {
      emit('drag-end');

      dragging.value = false;

      window.removeEventListener('mousemove', onDragging);
      window.removeEventListener('touchmove', onDragging);
    }
  }

  return {
    slider,
    onSliderDown,
  };
}
