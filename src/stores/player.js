import { ref, computed } from 'vue';
import { defineStore } from 'pinia';
import { Howl } from 'howler';
import debounce from 'lodash.debounce';

export const usePlayerStore = defineStore('player', () => {
  const dragging = ref(false);
  const currentSong = ref({});
  const sound = ref({});
  const seek = ref(0);
  const duration = ref(0);
  const volume = ref(0.1);
  const progress = ref(0);

  const isSoundLoaded = computed(() =>
    sound.value.state ? sound.value.state() === 'loaded' : false
  );

  const isSoundPlaying = computed(() =>
    isSoundLoaded.value ? sound.value.playing() : false
  );

  function createSong(song) {
    if (song.uuid === currentSong.value.uuid) {
      toggleAudio();
      return;
    }

    if (sound.value instanceof Howl) {
      sound.value.unload();
    }

    currentSong.value = song;

    sound.value = new Howl({
      src: [song.url],
      html5: true,
      volume: volume.value,
      onplay() {
        requestAnimationFrame(updateProgress);
      },
    });

    sound.value.play();
  }

  function pauseAudio() {
    if (isSoundPlaying.value) {
      sound.value.pause();
    }
  }

  function toggleAudio() {
    if (!isSoundLoaded.value) return;

    isSoundPlaying.value ? sound.value.pause() : sound.value.play();
  }

  function updateDraggingProgress(percent) {
    seek.value = duration.value * percent;
    progress.value = percent;
  }

  function updateProgress() {
    if (dragging.value) return;

    seek.value = sound.value.seek();
    duration.value = sound.value.duration();
    progress.value = sound.value.seek() / sound.value.duration();

    if (isSoundPlaying.value) {
      requestAnimationFrame(updateProgress);
    }
  }

  const updateSeek = debounce((percent) => {
    if (dragging.value || isSoundPlaying.value) return;

    const seconds = sound.value.duration() * percent;
    sound.value.seek(seconds);
    sound.value.play();
  }, 250);

  function updateVolume(percent) {
    if (!isSoundLoaded.value) return;

    volume.value = percent;
    sound.value.volume(percent);
  }

  return {
    dragging,
    currentSong,
    sound,
    seek,
    duration,
    volume,
    progress,
    isSoundLoaded,
    isSoundPlaying,
    createSong,
    pauseAudio,
    toggleAudio,
    updateDraggingProgress,
    updateSeek,
    updateVolume,
  };
});
