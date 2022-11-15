import { ref } from 'vue';
import { defineStore } from 'pinia';
import { Howl } from 'howler';
import { formatTime } from '@/helpers';

export const usePlayerStore = defineStore('player', () => {
  const currentSong = ref({});
  const sound = ref({});
  const seek = ref('0:00');
  const duration = ref('0:00');
  const volume = ref(0.25);
  const progress = ref(0);
  const isSoundPlaying = ref(false);
  const cacheSoundPlaying = ref(false);
  const isSoundLoaded = ref(false);

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
      loop: true,
    });

    sound.value.play();

    sound.value.on('load', () => {
      isSoundLoaded.value = true;
    });

    sound.value.on('play', () => {
      isSoundPlaying.value = true;
      cacheSoundPlaying.value = true;
      requestAnimationFrame(updateProgress);
    });
  }

  function checkAudioStatus() {
    if (isSoundLoaded.value && cacheSoundPlaying.value) {
      isSoundPlaying.value = !isSoundPlaying.value;
      isSoundPlaying.value ? sound.value.play() : sound.value.pause();
    }
  }

  function toggleAudio() {
    if (isSoundLoaded.value) {
      isSoundPlaying.value = !isSoundPlaying.value;
      cacheSoundPlaying.value = !cacheSoundPlaying.value;
      isSoundPlaying.value ? sound.value.play() : sound.value.pause();
    }
  }

  function updateProgress() {
    seek.value = formatTime(sound.value.seek());
    duration.value = formatTime(sound.value.duration());
    progress.value = (sound.value.seek() / sound.value.duration()) * 100;

    if (isSoundPlaying.value) {
      requestAnimationFrame(updateProgress);
    }
  }

  function updateSeek(percent) {
    if (isSoundLoaded.value) {
      const seconds = sound.value.duration() * percent;

      sound.value.seek(seconds);
      sound.value.once('seek', () => {
        updateProgress();
      });
    }
  }

  function updateVolume(percent) {
    if (isSoundLoaded.value) {
      volume.value = percent.toFixed(2);
      sound.value.volume(percent.toFixed(2));
    }
  }

  return {
    currentSong,
    sound,
    seek,
    duration,
    volume,
    progress,
    isSoundPlaying,
    cacheSoundPlaying,
    isSoundLoaded,
    createSong,
    checkAudioStatus,
    toggleAudio,
    updateSeek,
    updateVolume,
  };
});
