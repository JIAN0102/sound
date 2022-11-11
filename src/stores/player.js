import { ref } from 'vue';
import { defineStore } from 'pinia';
import { Howl } from 'howler';
import { formatTime } from '@/plugins/helper';

export const usePlayerStore = defineStore('player', () => {
  const currentSong = ref({});
  const sound = ref({});
  const seek = ref('00:00');
  const duration = ref('00:00');
  const progress = ref('0%');
  const playing = ref(false);
  const volume = ref(0.5);

  function createSong(song) {
    if (sound.value instanceof Howl) {
      sound.value.unload();
    }

    currentSong.value = song;

    sound.value = new Howl({
      src: [song.url],
      html5: true,
      volume: volume.value,
    });

    sound.value.play();

    sound.value.on('play', () => {
      requestAnimationFrame(updateProgress);
    });

    sound.value.on('seek', () => {
      requestAnimationFrame(updateProgress);
    });

    sound.value.on('end', () => {
      playing.value = false;
    });

    playing.value = true;
  }

  function toggleAudio() {
    if (sound.value.state && sound.value.state() === 'loaded') {
      playing.value = !playing.value;
      playing.value ? sound.value.play() : sound.value.pause();
    }
  }

  function updateProgress() {
    seek.value = formatTime(sound.value.seek());
    duration.value = formatTime(sound.value.duration());
    progress.value = `${(sound.value.seek() / sound.value.duration()) * 100}%`;

    if (playing.value) {
      requestAnimationFrame(updateProgress);
    }
  }

  function updateSeek(event) {
    if (sound.value.state && sound.value.state() === 'loaded') {
      const { x, width } = event.currentTarget.getBoundingClientRect();
      const clientX = event.clientX - x;
      const percentage = clientX / width;
      const seconds = sound.value.duration() * percentage;

      sound.value.seek(seconds);
    }
  }

  function updateVolume(event) {
    if (sound.value.state && sound.value.state() === 'loaded') {
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
    progress,
    playing,
    volume,
    createSong,
    toggleAudio,
    updateSeek,
    updateVolume,
  };
});
