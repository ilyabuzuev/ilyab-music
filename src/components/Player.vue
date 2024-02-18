<script setup lang="ts">
import { ref } from 'vue';
import { useSongsStore } from '@/stores/songs.store';
import type { ISong } from '@/models/ISong';
import { PlayStatus } from '@/enums/PlayStatus';
import { Icon } from '@iconify/vue';
import Button from '@/components/Button.vue';

const songsStore = useSongsStore();

class Player {
  public currentSongDuration = ref<number>(0);
  public currentSong = this.getCurrentSong();

  private createAudio(song: ISong): HTMLAudioElement {
    return new Audio(song.url);
  }

  public playSong(song: ISong): void {
    const audio =
      this.currentSong.info.id === song.id
        ? songsStore.getCurrentSong.audio
        : this.createAudio(song);

    if (audio) {
      songsStore.setCurrentSong(audio, song);

      audio.play();
      audio.volume = 0.05;

      songsStore.setStatus(PlayStatus.IS_PLAYING);
    }
  }

  public pauseSong(): void {
    if (this.currentSong.audio) {
      this.currentSong.audio.pause();
    }

    songsStore.setStatus(PlayStatus.IS_STOPPED);
  }

  public unPauseSong(): void {
    this.playSong(this.currentSong.info);
  }

  private stopSong(): void {
    if (this.currentSong.audio) {
      this.currentSong.audio.currentTime = 0.0;
      this.pauseSong();
    }
  }

  public playNextSong(): void {
    const nextSong = this.getNextSong();

    // this.updateCurrentSongDuration();
    // console.log(this.getCurrentSong());
    // console.log(this.getNextSong());

    if (nextSong) {
      this.stopSong();
      this.playSong(nextSong);
    }
  }

  private getNextSong() {
    if (this.currentSong.info.id === songsStore.songs.length) {
      return songsStore.getSongById(1);
    } else {
      return songsStore.getSongById(this.currentSong.info.id + 1);
    }
  }

  public playPreviousSong(): void {
    const previousSong = this.getPreviousSong();

    if (previousSong) {
      this.stopSong();
      this.playSong(previousSong);
    }
  }

  private getPreviousSong() {
    if (this.currentSong.info.id === 1) {
      return songsStore.getSongById(songsStore.songs.length);
    } else {
      return songsStore.getSongById(this.currentSong.info.id - 1);
    }
  }

  public getCurrentSong() {
    return songsStore.currentSong;
  }

  private getAlbumSize(): number {
    return songsStore.songs.length;
  }

  // public updateCurrentSongDuration() {
  //   const currentSong = this.getCurrentSong();

  //   currentSong.addEventListener('timeupdate', () => {
  //     this.currentSongDuration = currentSong.currentTime;
  //   });
  // }
}

const player = new Player();
</script>

<template>
  <div class="player" v-if="songsStore.currentSong.audio">
    <div class="player__controls">
      <Button
        @playerHandle="player.playPreviousSong()"
        noPaddings
        isTransparent
      >
        <template v-slot:icon>
          <Icon
            icon="tabler:player-track-prev-filled"
            height="26px"
            width="26px"
            color="var(--color-1)"
          />
        </template>
      </Button>
      <Button
        v-if="songsStore.getStatus === PlayStatus.IS_PLAYING"
        @playerHandle="player.pauseSong()"
        noPaddings
        isTransparent
      >
        <template v-slot:icon>
          <Icon
            icon="tabler:player-pause-filled"
            height="26px"
            width="26px"
            color="var(--color-1)"
          />
        </template>
      </Button>
      <Button
        v-else
        @playerHandle="player.unPauseSong()"
        noPaddings
        isTransparent
      >
        <template v-slot:icon>
          <Icon
            icon="tabler:player-play-filled"
            height="26px"
            width="26px"
            color="var(--color-1)"
          />
        </template>
      </Button>
      <Button
        @playerHandle="player.playNextSong()"
        noPaddings
        isTransparent
      >
        <template v-slot:icon>
          <Icon
            icon="tabler:player-track-next-filled"
            height="26px"
            width="26px"
            color="var(--color-1)"
          />
        </template>
      </Button>
    </div>
    <div class="player__song">
      <div>
        <picture>
          <img
            style="max-width: 44px"
            :src="player.getCurrentSong().info.cover"
            :alt="player.getCurrentSong().info.author"
          />
        </picture>
      </div>
      <div>
        <div>
          {{ player.getCurrentSong().info.title }}
        </div>
        <div>
          {{ player.getCurrentSong().info.author }}
        </div>
      </div>
    </div>
    {{ player.currentSongDuration }}
  </div>
</template>

<style scoped>
.player {
  width: 400px;
  display: flex;
  align-items: center;
  padding: var(--size-lg);
  background-color: var(--bg-color-soft);
  border-radius: var(--size-sm);
}

.player__controls {
  display: flex;
}

.player__song {
  display: flex;
}
</style>
