<script setup lang="ts">
import { usePlayerStore } from '@/stores/player.store';
import Player from '@/components/Player.vue';

const playerStore = usePlayerStore();
</script>

<template>
  <footer class="footer" v-if="playerStore.currentSong.audio">
    <div class="footer__container container">
      <Player />
    </div>
  </footer>
</template>

<style scoped>
.footer {
  position: sticky;
  bottom: 0;
  z-index: 10;
  background-color: var(--bg-color-darker);
  box-shadow: var(--shadow-xl);
}
</style>
