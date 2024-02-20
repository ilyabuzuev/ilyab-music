<script setup lang="ts">
import { useSongsStore } from '@/stores/songs.store';
import type { ISong } from '@/models/ISong';
import { PlayStatus } from '@/enums/PlayStatus';
import { convertTime } from '@/helpers/convertTime';
import IconPlay from '@/components/icons/IconPlay.vue';
import IconPause from '@/components/icons/IconPause.vue';
import Animation from '@/components/Animation.vue';

const props = defineProps<ISong>();

const songsStore = useSongsStore();
const { id, title, author, url, cover, duration } = props;
const song: ISong = { id, title, author, url, cover, duration };

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
    audio.volume = 0.05;

    songsStore.setStatus(PlayStatus.IS_PLAYING);

    audio.addEventListener('ended', songEndHandler);
    audio.addEventListener('timeupdate', currTimeUpdate);
  }
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

  if (nextSong) {
    stop();
    play(nextSong);
  }
}

function getNextSong() {
  const currentSong = songsStore.getCurrentSong;

  console.log(currentSong.info.id, songsStore.songs.length);

  if (currentSong.info.id === songsStore.songs.length) {
    return songsStore.getSongById(1);
  } else {
    return songsStore.getSongById(currentSong?.info.id + 1);
  }
}

function currTimeUpdate() {
  songsStore.getCurrentSong.currentTime =
    songsStore.getCurrentSong.audio?.currentTime;
}

function songEndHandler() { 
  next();
}

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

setSongToStore(song);
</script>

<template>
  <div
    class="song"
    :class="{
      'song--current': song.id === songsStore.getCurrentSong.info.id,
      'song--playing':
        songsStore.status === PlayStatus.IS_PLAYING &&
        song.id === songsStore.getCurrentSong.info.id,
    }"
    @click="songClickHandler"
  >
    <div class="song__cover">
      <div
        v-if="song.id === songsStore.getCurrentSong.info.id"
        class="song__animation"
      >
        <Animation
          v-show="songsStore.status === PlayStatus.IS_PLAYING"
        />
      </div>
      <div class="song__icon">
        <div
          v-if="
            songsStore.status === PlayStatus.IS_PLAYING &&
            song.id === songsStore.getCurrentSong.info.id
          "
        >
          <IconPause />
        </div>
        <div v-else>
          <IconPlay />
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
        <div v-if="song.id === songsStore.getCurrentSong.info.id">
          {{ convertTime(songsStore.getCurrentSong.currentTime) }}
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

.song--current {
  background-color: var(--bg-color-soft);
}

.song:hover {
  background-color: var(--bg-color-soft);
}

.song.song--playing:hover .song__animation {
  display: none;
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

.song.song--playing .song__icon {
  opacity: 0;
}

.song.song--playing:hover .song__icon {
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
