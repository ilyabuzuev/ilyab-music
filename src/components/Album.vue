<script setup lang="ts">
import { usePlayerStore } from '@/stores/player.store';
import Song from '@/components/Song.vue';
import Button from '@/components/Button.vue';
import type { IAlbum } from '@/models/IAlbum';

const props = defineProps<IAlbum>();
const playerStore = usePlayerStore();
const { id, title, author, releaseYear, cover, songs, description } = props;
const album: IAlbum = {
  id,
  title,
  author,
  releaseYear,
  cover,
  songs,
  description,
};

playerStore.setAlbum(album);
</script>

<template>
  <div class="album">
    <div class="album__header">
      <div class="album__cover">
        <picture>
          <img class="album__image" :src="cover" :alt="title" />
        </picture>
      </div>
      <div class="album__information">
        <div>
          <h2 class="album__title">
            {{ title }}
          </h2>
        </div>
        <div class="album__description">
          <h3 class="album__author">
            {{ author }}
          </h3>
          <div>•</div>
          <div>
            {{ releaseYear }}
          </div>
        </div>
        <div class="album__actions">
          <Button label="Слушать" :data-target-album="id" />
        </div>
      </div>
    </div>
    <div class="album__body">
      <ul class="album__list" v-if="songs.length">
        <li class="album__item" v-for="song in songs" :key="song.id">
          <Song
            :albumId="id"
            :id="song.id"
            :title="song.title"
            :author="song.author"
            :duration="song.duration"
            :cover="song.cover"
            :url="song.url"
          />
        </li>
      </ul>
      <div class="album__empty" v-else>Песни не найдены :(</div>
    </div>
  </div>
</template>

<style scoped>
.album {
  border-radius: var(--size-md);
}

.album__header {
  display: flex;
  gap: var(--size-lg);
  margin-bottom: var(--size-xl);
}

.album__image {
  display: block;
  max-width: var(--cover-size-xl);
  border-radius: var(--size-md);
  box-shadow: var(--shadow-sm);
}

.album__information {
  display: flex;
  flex-direction: column;
  gap: calc(var(--size-lg) * 1.5);
  align-self: end;
}

.album__title {
  font-size: var(--text-2xl);
  font-weight: 600;
  color: var(--text-color);
}

.album__description {
  display: flex;
  align-items: center;
  gap: var(--size-md);
  font-size: var(--text-md);
  font-weight: 500;
  line-height: 1;
  color: var(--text-color-soft);
}

.album__author {
  font-weight: 500;
}

.album__body {
  padding: var(--size-lg);
  border: 1px solid var(--bg-color-soft);
  border-radius: var(--size-sm);
}

.album__list {
  display: flex;
  flex-direction: column;
  gap: var(--size-sm);
}

.album__empty {
  font-size: var(--text-sm);
  color: var(--text-color-soft);
}
</style>
