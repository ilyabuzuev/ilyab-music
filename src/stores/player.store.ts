import { defineStore } from 'pinia';
import { PlayStatus } from '@/enums/PlayStatus';
import type { IAlbum } from '@/models/IAlbum';
import type { ISong } from '@/models/ISong';

interface PlayerStoreState {
  _status: PlayStatus;
  _albums: IAlbum[];
  _currentSong: {
    info: ISong;
    audio: HTMLAudioElement | null;
    currentTime: number | undefined;
  };
}

export const usePlayerStore = defineStore('playerStore', {
  state: (): PlayerStoreState => ({
    _status: PlayStatus.IDLE,
    _albums: [],
    _currentSong: {
      info: {
        albumId: 0,
        id: 0,
        title: '',
        author: '',
        cover: '',
        duration: '',
        url: '',
      },
      audio: null,
      currentTime: 0,
    },
  }),

  getters: {
    getSongById: (state: PlayerStoreState) => {
      return (songId: number, albumId: number): ISong | undefined =>
        state._albums[albumId].songs.find(
          (song: ISong): boolean => song.id === songId
        );
    },

    currentSong(): PlayerStoreState['_currentSong'] {
      return this._currentSong;
    },

    nextSong(): ISong {
      const albumId = this.currentSong.info.albumId - 1;
      const songId = this.currentSong.info.id;

      if (songId === this._albums[albumId].songs.length) {
        return this._albums[albumId].songs[0];
      } else {
        return this._albums[albumId].songs[songId];
      }
    },

    status(): PlayStatus {
      return this._status;
    },
  },

  actions: {
    setAlbum(album: IAlbum): void {
      this._albums.push(album);
    },

    setCurrentSong(audio: HTMLAudioElement, song: ISong): void {
      this._currentSong.audio = audio;
      this._currentSong.info = song;
    },

    setStatus(status: PlayStatus): void {
      this._status = status;
    },

    createAudio(song: ISong): HTMLAudioElement {
      return new Audio(song.url);
    },

    playSong(song: ISong): void {
      const audio =
        this.currentSong.info.id === song.id
          ? this.currentSong.audio
          : this.createAudio(song);

      if (audio) {
        this.setCurrentSong(audio, song);

        audio.play();
        audio.volume = 0.05;

        this.setStatus(PlayStatus.IS_PLAYING);

        audio.addEventListener('ended', this.songEndHandler);
        audio.addEventListener('timeupdate', this.currentTimeUpdate);
      }
    },

    pauseSong(): void {
      if (this.currentSong.audio) this.currentSong.audio.pause();

      this.setStatus(PlayStatus.IS_STOPPED);
    },

    stopSong(): void {
      if (this.currentSong.audio) {
        this.pauseSong();
        this.currentSong.audio.currentTime = 0.0;
      }
    },

    playNextSong() {
      const nextSong = this.nextSong;

      if (nextSong) {
        this.stopSong();
        this.playSong(nextSong);
      }
    },

    currentTimeUpdate() {
      this.currentSong.currentTime =
        this.currentSong.audio?.currentTime;
    },

    songEndHandler() {
      this.playNextSong();
    },
  },
});
