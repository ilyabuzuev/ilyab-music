<script setup lang="ts">
import { useRouter } from 'vue-router';
import Album from '@/components/Album.vue';
import { albums } from '@/data/data';
import type { IAlbum } from '@/models/IAlbum';

const router = useRouter();

const id: string = router.currentRoute.value.params
  .id as unknown as string;
const album: IAlbum = getAlbum(Number(id));

function getAlbum(id: number): IAlbum {
  const album = albums.find(
    (album: IAlbum) => album.id === id
  ) as unknown as IAlbum;

  return album;
}
</script>

<template>
  <div class="container">
    <Album
      :id="album.id"
      :title="album.title"
      :author="album.author"
      :releaseYear="album.releaseYear"
      :cover="album.cover"
      :songs="album.songs"
      :description="album.description"
    />
  </div>
</template>

<style scoped>
.test {
  color: var(--text-color);
}
</style>
