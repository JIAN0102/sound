import { ref, computed } from 'vue';
import { defineStore } from 'pinia';
import { Howl } from 'howler';
import { formatTime } from '@/helpers';

export const usePlayerStore = defineStore('player', () => {
  const currentSong = ref({});
  const sound = ref({});
  const seek = ref('0:00');
  const duration = ref('0:00');
  const volume = ref(0.1);
  const progress = ref(0);
  const cacheSoundPlaying = ref(false);
  const isSoundLoaded = ref(false);

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
      loop: true,
      onplay() {
        requestAnimationFrame(updateProgress);
      },
      onseek() {
        requestAnimationFrame(updateProgress);
      },
      onload() {
        isSoundLoaded.value = true;
      },
    });

    sound.value.play();
  }

  function checkAudioStatusByDragStart() {
    if (isSoundLoaded.value) {
      cacheSoundPlaying.value = isSoundPlaying.value;
      sound.value.pause();
    }
  }

  function checkAudioStatusByDragEnd() {
    if (
      isSoundLoaded.value &&
      !isSoundPlaying.value &&
      cacheSoundPlaying.value
    ) {
      sound.value.play();
    }
  }

  function toggleAudio() {
    if (isSoundLoaded.value) {
      sound.value.playing() ? sound.value.pause() : sound.value.play();
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
    if (isSoundLoaded.value && !isSoundPlaying.value) {
      const seconds = sound.value.duration() * percent;
      sound.value.seek(seconds);
    }
  }

  function updateVolume(percent) {
    if (isSoundLoaded.value) {
      volume.value = percent;
      sound.value.volume(percent);
    }
  }

  return {
    currentSong,
    sound,
    seek,
    duration,
    volume,
    progress,
    cacheSoundPlaying,
    isSoundPlaying,
    createSong,
    checkAudioStatusByDragStart,
    checkAudioStatusByDragEnd,
    toggleAudio,
    updateSeek,
    updateVolume,
  };
});
