<script setup lang="ts">
import Header from '@/components/Header.vue';
import Player from '@/components/Player.vue';
import Main from '@/components/Main.vue';
</script>

<template>
  <div class="page__layout">
    <div class="page__container container">
      <Header />
      <Player />
      <Main>
        <RouterView />
      </Main>
    </div>
  </div>
</template>

<style scoped>
.page__container {
  display: flex;
  flex-direction: column;
  gap: var(--size-lg);
}
</style>
