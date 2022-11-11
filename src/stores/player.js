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
  const progress = ref('0%');
  const isSoundPlaying = ref(false);
  const isSoundLoaded = ref(false);

  function setSong(song) {
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

    isSoundPlaying.value = true;

    sound.value.on('load', () => {
      isSoundLoaded.value = true;
    });

    sound.value.on('play', () => {
      requestAnimationFrame(updateProgress);
    });

    sound.value.on('seek', () => {
      requestAnimationFrame(updateProgress);
    });

    sound.value.on('end', () => {
      isSoundPlaying.value = false;
    });
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
    progress.value = `${(sound.value.seek() / sound.value.duration()) * 100}%`;

    if (isSoundPlaying.value) {
      requestAnimationFrame(updateProgress);
    }
  }

  function updateSeek(event) {
    if (isSoundLoaded.value) {
      const { x, width } = event.currentTarget.getBoundingClientRect();
      const clientX = event.clientX - x;
      const percentage = clientX / width;
      const seconds = sound.value.duration() * percentage;

      sound.value.seek(seconds);
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
    setSong,
    toggleAudio,
    updateSeek,
    updateVolume,
  };
});
