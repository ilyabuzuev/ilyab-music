import type { ISong } from '@/models/ISong';

export interface IStoreSong {
  info: ISong,
  audio: HTMLAudioElement,
}