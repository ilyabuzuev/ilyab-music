<script setup lang="ts">
import { usePlayerStore } from '@/stores/player.store';
import type { ISong } from '@/models/ISong';
import { PlayStatus } from '@/enums/PlayStatus';
import { convertTime } from '@/helpers/convertTime';
import IconPlay from '@/components/icons/IconPlay.vue';
import IconPause from '@/components/icons/IconPause.vue';
import Animation from '@/components/Animation.vue';

const song = defineProps<ISong>();
const playerStore = usePlayerStore();

function songClickHandler(): void {
  if (playerStore.status === PlayStatus.IDLE) {
    playerStore.playSong(song);
    return;
  }

  if (playerStore.status === PlayStatus.IS_PLAYING) {
    if (song.id === playerStore.currentSong.info.id) {
      playerStore.pauseSong();
    } else {
      playerStore.stopSong();
      playerStore.playSong(song);
    }

    return;
  }

  if (playerStore.status === PlayStatus.IS_STOPPED) {
    if (song.id === playerStore.currentSong.info.id) {
      playerStore.playSong(playerStore.currentSong.info);
    } else {
      playerStore.stopSong();
      playerStore.playSong(song);
    }

    return;
  }
}
</script>

<template>
  <div
    class="song"
    :class="{
      'song--current': song.id === playerStore.currentSong.info.id,
      'song--playing':
        playerStore.status === PlayStatus.IS_PLAYING &&
        song.id === playerStore.currentSong.info.id,
    }"
    @click="songClickHandler"
  >
    <div class="song__cover">
      <div
        v-if="song.id === playerStore.currentSong.info.id"
        class="song__animation"
      >
        <Animation
          v-show="playerStore.status === PlayStatus.IS_PLAYING"
        />
      </div>
      <div class="song__icon">
        <div
          v-if="
            playerStore.status === PlayStatus.IS_PLAYING &&
            song.id === playerStore.currentSong.info.id
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
        <div v-if="song.id === playerStore.currentSong.info.id">
          {{ convertTime(playerStore.currentSong.currentTime) }}
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
