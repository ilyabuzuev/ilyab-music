<script setup lang="ts">
import Header from "@/components/Header.vue";
import Main from "@/components/Main.vue";
</script>

<template>
  <div class="page__layout">
    <Header />
    <Main>
      <RouterView />
    </Main>
  </div>
</template>

<style scoped>
.page__layout {
  padding: var(--size-xl);
}
</style>