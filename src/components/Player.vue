<script setup lang="ts">
import { usePlayerStore } from '@/stores/player.store';
import { PlayStatus } from '@/enums/PlayStatus';
import { convertTime } from '@/helpers/convertTime';
import { Icon } from '@iconify/vue';
import Button from '@/components/Button.vue';
import Slider from '@/components/Slider.vue';

const playerStore = usePlayerStore();
</script>

<template>
  <div class="player" v-if="playerStore.currentSong.audio">
    <div class="player__controls">
      <Button @playerHandle="playerStore.playPreviousSong()" noPaddings isTransparent>
        <template v-slot:icon>
          <Icon
            icon="tabler:player-track-prev-filled"
            height="20px"
            width="20px"
            color="var(--color-1)"
          />
        </template>
      </Button>
      <Button
        v-if="playerStore.status === PlayStatus.IS_PLAYING"
        @playerHandle="playerStore.pauseSong()"
        noPaddings
        isTransparent
      >
        <template v-slot:icon>
          <Icon
            icon="tabler:player-pause-filled"
            height="28px"
            width="28px"
            color="var(--color-1)"
          />
        </template>
      </Button>
      <Button v-else @playerHandle="playerStore.unpauseSong()" noPaddings isTransparent>
        <template v-slot:icon>
          <Icon
            icon="tabler:player-play-filled"
            height="26px"
            width="26px"
            color="var(--color-1)"
          />
        </template>
      </Button>
      <Button @playerHandle="playerStore.playNextSong()" noPaddings isTransparent>
        <template v-slot:icon>
          <Icon
            icon="tabler:player-track-next-filled"
            height="20px"
            width="20px"
            color="var(--color-1)"
          />
        </template>
      </Button>
    </div>
    <div class="player__content">
      <div class="player__cover">
        <picture>
          <img
            class="player__img"
            :src="playerStore.currentSong.info.cover"
            :alt="playerStore.currentSong.info.title"
          />
        </picture>
      </div>
      <div class="player__text">
        <div class="player__title">
          {{ playerStore.currentSong.info.title }}
        </div>
        <div class="player__author">
          {{ playerStore.currentSong.info.author }}
        </div>
      </div>
    </div>
    <div class="player__slider">
      <Slider />
    </div>
    <div class="player__current-time">
      {{ convertTime(playerStore.currentSong.currentTime) }}
    </div>
  </div>
</template>

<style scoped>
.player {
  display: grid;
  grid-template-columns: 80px 180px 1fr 60px;
  align-items: center;
  gap: var(--size-lg);
  padding: var(--size-lg);
  background-color: var(--bg-color-soft);
  border-radius: var(--size-sm);
}

.player__controls {
  display: flex;
  justify-content: space-between;
}

.player__content {
  display: flex;
  align-items: center;
  gap: var(--size-sm);
  margin-right: auto;
}

.player__cover {
  width: 40px;
  height: 40px;
}

.player__img {
  width: 100%;
  border-radius: var(--size-xs);
  box-shadow: var(--shadow-xs);
}

.player__title,
.player__author {
  width: 140px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.player__title {
  font-size: var(--text-sm);
  color: var(--text-color);
}

.player__author {
  font-size: var(--text-sm);
  color: var(--text-color-soft);
}

.player__current-time {
  font-size: var(--text-sm);
  color: var(--text-color);
}
</style>
