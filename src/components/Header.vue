<script setup lang="ts">
import Logo from '@/components/Logo.vue';
import Navigation from '@/components/Navigation.vue';
</script>

<template>
  <header class="header container">
    <div class="header__container">
      <div class="header__content">
        <Logo />
        <Navigation />
      </div>
    </div>
  </header>
</template>

<style scoped>
.header {
  width: 100%;
}

.header__content {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
</style>
