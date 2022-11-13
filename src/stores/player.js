import { ref } from 'vue';
import { defineStore } from 'pinia';
import { Howl } from 'howler';
import { formatTime } from '@/helpers';

export const usePlayerStore = defineStore('player', () => {
  const currentSong = ref({});
  const sound = ref({});
  const seek = ref('00:00');
  const duration = ref('00:00');
  const volume = ref(0.25);
  const progress = ref(0);
  const isSoundPlaying = ref(false);
  const isSoundLoaded = ref(false);

  function createSong(song) {
    if (currentSong.value.uuid === song.uuid) {
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
    });

    sound.value.play();

    sound.value.on('load', () => {
      isSoundLoaded.value = true;
    });

    sound.value.on('play', () => {
      isSoundPlaying.value = true;
      requestAnimationFrame(updateProgress);
    });

    sound.value.on('end', () => {
      isSoundPlaying.value = false;
    });
  }

  function playAudio() {
    if (isSoundLoaded.value) {
      isSoundPlaying.value = true;
      sound.value.play();
    }
  }

  function pauseAudio() {
    if (isSoundLoaded.value) {
      isSoundPlaying.value = false;
      sound.value.pause();
    }
  }

  function toggleAudio() {
    if (isSoundLoaded.value) {
      isSoundPlaying.value = !isSoundPlaying.value;
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

  function updateSeek(percentage) {
    if (isSoundLoaded.value) {
      const seconds = sound.value.duration() * percentage;

      sound.value.seek(seconds);
      sound.value.once('seek', () => {
        updateProgress();
      });
    }
  }

  function updateVolume(event) {
    if (isSoundLoaded.value) {
      const { x, width } = event.currentTarget.getBoundingClientRect();
      const clientX = event.clientX - x;
      const percentage = clientX / width;

      volume.value = percentage;
      sound.value.volume(percentage);
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
    isSoundLoaded,
    createSong,
    playAudio,
    pauseAudio,
    toggleAudio,
    updateSeek,
    updateVolume,
  };
});
