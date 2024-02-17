<script setup lang="ts">
import { ref } from 'vue';
import { useSongsStore } from '@/stores/songs.store';
import type { ISong } from '@/models/ISong';
import { PlayStatus } from '@/enums/PlayStatus';
import IconPlay from '@/components/icons/IconPlay.vue';
import IconPause from '@/components/icons/IconPause.vue';
import Animation from "@/components/Animation.vue";

const props = defineProps<ISong>();

const songsStore = useSongsStore();
const currentDuration = ref<string>(props.duration);
const { id, title, author, url, cover, duration } = props;
const song: ISong = { id, title, author, url, cover, duration };

function setSongToStore(song: ISong): void {
  songsStore.setSong(song);
}

function createAudio(song: ISong): HTMLAudioElement {
  const audio = new Audio(song.url);

  audio.dataset.id = String(song.id);

  return audio;
}

function play(audio: HTMLAudioElement): void {
  songsStore.setCurrentSong(audio);

  audio.play();
  audio.volume = 0.1;

  songsStore.setStatus(PlayStatus.IS_PLAYING);

  songEndHandler(audio);
}
function pause() {
  const currentSong: HTMLAudioElement = songsStore.getCurrentSong as unknown as HTMLAudioElement;

  currentSong.pause();

  songsStore.setStatus(PlayStatus.IS_STOPPED);
}

function stop() {
  const currentSong: HTMLAudioElement = songsStore.getCurrentSong as unknown as HTMLAudioElement;

  pause();

  currentSong.currentTime = 0.0;
}

function next() {
  const nextSong = getNextSong();

  console.log(songsStore.getCurrentSong, nextSong)

  stop();
  play(nextSong);
}

function getNextSong(): HTMLAudioElement {
  const currentSong: HTMLAudioElement = songsStore.getCurrentSong as unknown as HTMLAudioElement;
  const currentSongId = currentSong.dataset.id as unknown as string;
  const nextSong: ISong = songsStore.getSongById(+currentSongId + 1) as unknown as ISong;

  return createAudio(nextSong);
}

function songEndHandler(audio: HTMLAudioElement) {
  audio.addEventListener('ended', () => {
    next();
  });
}

// class Song {
//   song: ISong;
//   currentSong: HTMLAudioElement;
//
//   constructor(song: ISong) {
//     this.song = song;
//     this.currentSong = songsStore.getCurrentSong as unknown as HTMLAudioElement;
//   }
//
//   private create(): HTMLAudioElement {
//     return new Audio(this.song.url);
//   }
//
//   public play(): void {
//     const audio = this.create();
//
//     audio.play();
//     audio.volume = 0.1;
//
//     this.currentSong = audio;
//   }
// }
//
// const audio = new Song(song);

function songClickHandler(): void {
  const audio: HTMLAudioElement = createAudio(song);
  const currentSong: HTMLAudioElement = songsStore.getCurrentSong as unknown as HTMLAudioElement;
  const status: PlayStatus = songsStore.getStatus;

  if (status === PlayStatus.IDLE) {
    play(audio);
    return;
  }

  if (status === PlayStatus.IS_PLAYING) {
    if (song.id === +currentSong.dataset.id) {
      pause();
    } else {
      stop();
      play(audio);
    }

    return;
  }

  if (status === PlayStatus.IS_STOPPED) {
    if (song.id === +currentSong.dataset.id) {
      play(currentSong);
    } else {
      stop();
      play(audio);
    }

    return;
  }
}

setSongToStore(song);

// console.log(songsStore.songs);
</script>

<template>
  <div class="song" :class="{'song--playing': PlayStatus.IS_PLAYING && song.id === +songsStore.getCurrentSong?.dataset.id}" @click="songClickHandler">
    <div class="song__cover">
      <div class="song__icon">
        <div v-if="songsStore.status === PlayStatus.IS_PLAYING && song.id === +songsStore.getCurrentSong?.dataset.id">
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
      <div class="song__animation">
        <Animation />
      </div>
      <div class="song__duration">
        {{ currentDuration }}
      </div>
    </div>
  </div>
</template>

<style scoped>
.song {
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
  transition: opacity .3s ease;
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
  transition: opacity .3s ease;
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
  align-self: stretch;
}
</style>
