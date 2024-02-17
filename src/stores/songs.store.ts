import { defineStore } from 'pinia';
import type { ISong } from '@/models/ISong';
import { PlayStatus } from '@/enums/PlayStatus';

interface State {
  status: PlayStatus;
  currentSong: HTMLAudioElement | null;
  songs: ISong[];
}

export const useSongsStore = defineStore('songsStore', {
  state: (): State => ({
    status: PlayStatus.IDLE,
    currentSong: null,
    songs: [],
  }),
  getters: {
    getSongById: (state: State) => {
      return (songId: number) =>
        state.songs.find(
          (song: ISong): boolean => song.id === songId
        );
    },
    getCurrentSong(state) {
      return state.currentSong;
    },
    getStatus(state): PlayStatus {
      return state.status;
    },
  },
  actions: {
    setSong(song: ISong): void {
      this.songs.push(song);
    },
    setCurrentSong(audio: HTMLAudioElement): void {
      this.currentSong = audio;
    },
    setStatus(status: PlayStatus): void {
      this.status = status;
    },
  },
});
