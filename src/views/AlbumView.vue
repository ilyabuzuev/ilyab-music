<script setup lang="ts">
import { useRouter } from 'vue-router';
import Album from '@/components/Album.vue';
import { albums } from '@/data/data';
import type { IAlbum } from '@/models/IAlbum';

const router = useRouter();

const id: number = router.currentRoute.value.params.id;
const album: IAlbum = getAlbum(id);

function getAlbum(id: number): IAlbum {
  return albums.find((album: IAlbum) => album.id == id);
}
</script>

<template>
  <div class="container test">
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
