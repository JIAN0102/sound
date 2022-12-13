import { ref, computed } from 'vue';
import { defineStore } from 'pinia';
import { Howl } from 'howler';
import debounce from 'lodash.debounce';

export const usePlayerStore = defineStore('player', () => {
  const currentSong = ref({});
  const sound = ref({});
  const seek = ref(0);
  const duration = ref(0);
  const volume = ref(0.1);
  const progress = ref(0);
  const isStopUpdateProgress = ref(false);

  const isSoundLoaded = computed(() =>
    sound.value.state ? sound.value.state() === 'loaded' : false
  );

  const isSoundPlaying = computed(() =>
    isSoundLoaded.value ? sound.value.playing() : false
  );

  function createSong(song) {
    if (song.docID === currentSong.value.docID) {
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

  function createSongWhenNotPlaying(song) {
    if (isSoundPlaying.value) return;
    createSong(song);
  }

  function pauseAudio() {
    if (!isSoundPlaying.value) return;
    sound.value.pause();
  }

  function toggleAudio() {
    if (!isSoundLoaded.value) return;
    isSoundPlaying.value ? sound.value.pause() : sound.value.play();
  }

  function updateCacheProgress(percent) {
    if (!isSoundLoaded.value) return;
    seek.value = duration.value * percent;
    progress.value = percent;
  }

  function updateProgress() {
    if (isStopUpdateProgress.value) return;

    seek.value = sound.value.seek();
    duration.value = sound.value.duration();
    progress.value = sound.value.seek() / sound.value.duration();

    if (isSoundPlaying.value) {
      requestAnimationFrame(updateProgress);
    }
  }

  const updateSeek = debounce(() => {
    if (
      isStopUpdateProgress.value ||
      !isSoundLoaded.value ||
      isSoundPlaying.value
    )
      return;

    const seconds = sound.value.duration() * progress.value;
    sound.value.seek(seconds);
    sound.value.play();
  }, 250);

  function updateVolume(percent) {
    if (!isSoundLoaded.value) return;
    volume.value = percent;
    sound.value.volume(percent);
  }

  return {
    currentSong,
    sound,
    seek,
    duration,
    volume,
    progress,
    isStopUpdateProgress,
    isSoundLoaded,
    isSoundPlaying,
    createSong,
    createSongWhenNotPlaying,
    pauseAudio,
    toggleAudio,
    updateCacheProgress,
    updateSeek,
    updateVolume,
  };
});
