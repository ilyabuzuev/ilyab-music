<script setup lang="ts">

</script>

<template>
  <div class="logo">
    <router-link class="logo__link" to="/">
      <img class="logo__img" src="@/assets/images/logo.svg" alt="IlyaB Music">
    </router-link>
  </div>
</template>

<style scoped>
.logo {
  width: 80px;
}

.logo__img {
  max-width: 100%;
  filter: invert(0%);
}

@media (prefers-color-scheme: dark) {
  .logo__img {
    filter: invert(100%);
  }
}
</style>