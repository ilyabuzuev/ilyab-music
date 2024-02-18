<script setup lang="ts">
import Logo from '@/components/Logo.vue';
import Navigation from '@/components/Navigation.vue';
import Player from '@/components/Player.vue';
</script>

<template>
  <header class="header">
    <div class="container header__container">
      <div class="header__content">
        <Logo />
        <Navigation />
        <Player />
      </div>
    </div>
  </header>
</template>

<style scoped>
.header__content {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
</style>
