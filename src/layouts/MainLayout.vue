<script setup lang="ts">
import Header from '@/components/Header.vue';
import Main from '@/components/Main.vue';
import Footer from '@/components/Footer.vue';
</script>

<template>
  <div class="page__layout">
    <Header />
    <Main>
      <RouterView />
    </Main>
    <Footer />
  </div>
</template>

<style scoped>
.page__layout {
  display: grid;
  grid-template-rows: max-content 1fr max-content;
  justify-content: stretch;
  min-height: 100dvh;
}
</style>
