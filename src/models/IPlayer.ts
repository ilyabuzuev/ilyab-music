export interface IPlayer {
  getCurrentSong: () => HTMLAudioElement | null;
  getNextSong?: () => HTMLAudioElement;
  playNextSong: () => void;
  getAlbumSize: () => number;
}