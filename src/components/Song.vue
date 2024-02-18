<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useSongsStore } from '@/stores/songs.store';
import type { ISong } from '@/models/ISong';
import { PlayStatus } from '@/enums/PlayStatus';
import IconPlay from '@/components/icons/IconPlay.vue';
import IconPause from '@/components/icons/IconPause.vue';
import Animation from '@/components/Animation.vue';

const props = defineProps<ISong>();

const songsStore = useSongsStore();
const { id, title, author, url, cover, duration } = props;
const song: ISong = { id, title, author, url, cover, duration };

const currentTime = ref();

function setSongToStore(song: ISong): void {
  songsStore.setSong(song);
}

function createAudio(song: ISong): HTMLAudioElement {
  return new Audio(song.url);
}

function play(song: ISong): void {
  const audio =
    songsStore.getCurrentSong.info.id === song.id
      ? songsStore.getCurrentSong.audio
      : createAudio(song);

  if (audio) {
    songsStore.setCurrentSong(audio, song);

    audio.play();
    audio.volume = 0.1;

    songsStore.setStatus(PlayStatus.IS_PLAYING);

    // songEndHandler(audio);
  }

  // const csong = songsStore.getCurrentSong;

  // if (csong) {
  //   csong.addEventListener('timeupdate', currTimeUpdate);
  // }
}
function pause() {
  const currentSong = songsStore.getCurrentSong;

  if (currentSong.audio) currentSong.audio.pause();

  songsStore.setStatus(PlayStatus.IS_STOPPED);
}

function stop() {
  const currentSong = songsStore.getCurrentSong;

  if (currentSong.audio) {
    pause();

    currentSong.audio.currentTime = 0.0;
  }
}

function next() {
  const nextSong = getNextSong();

  // console.log(songsStore.getCurrentSong.info, nextSong);

  stop();
  play(nextSong);
}

function getNextSong() {
  const currentSong = songsStore.getCurrentSong;

  if (currentSong.info.id === songsStore.songs.length) {
    return songsStore.getSongById(1);
  } else {
    return songsStore.getSongById(currentSong?.info.id + 1);
  }
}

// function songEndHandler(audio: HTMLAudioElement) {
//   audio.addEventListener('ended', () => {
//     next();
//   });
// }

function songClickHandler(): void {
  const currentSong = songsStore.getCurrentSong;
  const status: PlayStatus = songsStore.getStatus;

  if (status === PlayStatus.IDLE) {
    play(song);
    return;
  }

  if (status === PlayStatus.IS_PLAYING) {
    if (song.id === currentSong.info.id) {
      pause();
    } else {
      stop();
      play(song);
    }

    return;
  }

  if (status === PlayStatus.IS_STOPPED) {
    if (song.id === currentSong.info.id) {
      play(currentSong.info);
    } else {
      stop();
      play(song);
    }

    return;
  }
}

// function currTimeUpdate() {
//   currentTime.value = songsStore.getCurrentSong.currentTime;
// }

setSongToStore(song);
</script>

<template>
  <div
    class="song"
    :class="{
      'song--playing':
        PlayStatus.IS_PLAYING &&
        // @ts-ignore
        song.id === songsStore.getCurrentSong.id,
    }"
    @click="songClickHandler"
  >
    <div class="song__cover">
      <div class="song__animation">
        <Animation />
      </div>
      <div class="song__icon">
        <div
          v-if="
            songsStore.status === PlayStatus.IS_PLAYING &&
            // @ts-ignore
            song.id === songsStore.getCurrentSong.info.id
          "
        >
          <IconPause />
        </div>
        <div v-else>
          <!-- TODO:расскомненить строку -->
          <!-- <IconPlay /> -->
        </div>
      </div>
      <picture>
        <img class="song__img" :src="cover" :alt="title" />
      </picture>
    </div>
    <div class="song__information">
      <div>
        <div class="song__title">
          {{ title }}
        </div>
        <div class="song__author">
          {{ author }}
        </div>
      </div>
      <div class="song__duration">
        <div v-if="songsStore.getCurrentSong.info.id">
          {{ currentTime }}
        </div>
        <div v-else>
          {{ duration }}
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.song {
  position: relative;
  display: flex;
  align-items: center;
  gap: var(--size-sm);
  padding: var(--size-sm);
  border-radius: var(--size-xs);
  transition: background-color 0.3s ease;
  cursor: pointer;
  user-select: none;
}

.song--playing {
  background-color: var(--bg-color-soft);
}

.song:hover {
  background-color: var(--bg-color-soft);
}

.song__cover {
  position: relative;
  width: 48px;
  transition: filter 0.3s ease;
  border-radius: var(--size-xs);
}

.song__cover::after {
  content: '';
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-color: var(--color-11);
  border-radius: var(--size-xs);
  opacity: 0;
  transition: opacity 0.3s ease;
  z-index: 1;
}

.song:hover .song__cover::after,
.song.song--playing .song__cover::after {
  opacity: 0.8;
}

.song__icon {
  position: absolute;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  opacity: 0;
  transition: opacity 0.3s ease;
  z-index: 10;
}

.song:hover .song__icon,
.song.song--playing .song__icon {
  opacity: 1;
}

.song__img {
  display: block;
  max-width: 100%;
  border-radius: var(--size-xs);
  box-shadow: var(--shadow-xs);
}

.song__information {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: max-content;
}

.song__title {
  font-size: var(--text-sm);
  color: var(--text-color);
}

.song__author {
  font-size: var(--text-sm);
  color: var(--text-color-soft);
}

.song__animation {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  align-self: stretch;
  z-index: 10;
}
</style>
