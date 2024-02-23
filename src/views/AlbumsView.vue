<script setup lang="ts">
import { albums } from '@/data/data';
</script>

<template>
  <div class="albums">
    <div class="container-REMOVE_THIS">
      <ul class="albums__list">
        <li class="albums__item" v-for="album in albums" :key="album.id">
          <router-link :to="`/albums/${album.id}`">
            <div class="album">
              <div class="album__header">
                <div class="album__cover">
                  <picture>
                    <img class="album__img" :src="album.cover" alt="" />
                  </picture>
                </div>
                <div class="album__information">
                  <div class="album__type">Альбом</div>
                  <h2 class="album__title">
                    {{ album.title }}
                  </h2>
                  <h3 class="album__author">
                    {{ album.author }}
                  </h3>
                  <div class="album__release">
                    {{ album.releaseYear }}
                  </div>
                </div>
              </div>
              <div class="album__body">
                <p class="album__description">
                  {{ album.description }}
                </p>
              </div>
            </div>
          </router-link>
        </li>
      </ul>
    </div>
  </div>
</template>

<style scoped>
.albums {
  padding: var(--size-xl) 0;
}

.albums__item {
  /*background-color: var(--bg-color-soft);*/
  border: 1px solid var(--bg-color-soft);
  border-radius: var(--size-sm);
  transition:
    box-shadow 0.5s ease,
    background-color 0.5s ease;
}

.albums__item:hover {
  background-color: var(--bg-color-soft);
  box-shadow: var(--shadow-sm);
}

.albums__item:not(:last-child) {
  margin-bottom: var(--size-xl);
}

.album {
  display: flex;
  flex-direction: column;
  gap: var(--size-lg);
  padding: var(--size-lg);
}

.album__header {
  display: flex;
  gap: var(--size-md);
}

.album__cover {
  width: 120px;
}

.album__img {
  max-width: 100%;
  border-radius: var(--size-sm);
  box-shadow: var(--shadow-sm);
}

.album__information {
  display: flex;
  flex-direction: column;
  justify-content: end;
  gap: var(--size-sm);
}

.album__type {
  font-size: var(--text-sm);
  color: var(--text-color-soft);
}

.album__title {
  font-size: var(--text-lg);
  color: var(--text-color);
}

.album__author {
  font-size: var(--text-sm);
  color: var(--text-color-soft);
}

.album__release {
  font-size: var(--text-sm);
  color: var(--text-color-soft);
}

.album__description {
  font-size: calc(var(--text-sm) * 1.2);
  color: var(--text-color-soft);
}
</style>
