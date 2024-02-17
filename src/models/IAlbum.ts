import type { ISong } from '@/models/ISong';
export interface IAlbum {
  id: number;
  title: string;
  author: string;
  releaseYear: number;
  cover: string;
  songs: ISong[];
  description: string;
}