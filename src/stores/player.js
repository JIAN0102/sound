import { ref, computed } from 'vue';
import { defineStore } from 'pinia';
import { Howl } from 'howler';

export const usePlayerStore = defineStore('player', () => {
  const dragging = ref(false);
  const currentSong = ref({});
  const sound = ref({});
  const seek = ref(0);
  const duration = ref(0);
  const volume = ref(0.1);
  const progress = ref(0);
  const cacheSoundPlaying = ref(false);

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
      isSoundLoaded.value = false;
    }

    currentSong.value = song;

    sound.value = new Howl({
      src: [song.url],
      html5: true,
      volume: volume.value,
      onplay() {
        requestAnimationFrame(updateProgress);
      },
      onload() {
        isSoundLoaded.value = true;
      },
    });

    sound.value.play();
  }

  function toggleAudio() {
    if (!isSoundLoaded.value) return;

    isSoundPlaying.value ? sound.value.pause() : sound.value.play();
  }

  function recordAudioStatusAndPauseAudio() {
    cacheSoundPlaying.value = isSoundPlaying.value;
    sound.value.pause();
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

  function updateSeek(percent) {
    const seconds = sound.value.duration() * percent;
    sound.value.seek(seconds);

    if (cacheSoundPlaying.value && !isSoundPlaying.value) {
      sound.value.play();
    }
  }

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
    cacheSoundPlaying,
    isSoundPlaying,
    createSong,
    toggleAudio,
    recordAudioStatusAndPauseAudio,
    updateSeek,
    updateVolume,
  };
});
