<script setup lang="ts">

</script>

<template>
  <nav class="navigation">
    <ul class="navigation__list">
      <li class="navigation__item">
        <router-link class="navigation__link" to="/albums">
          Альбомы
        </router-link>
      </li>
    </ul>
  </nav>
</template>

<style scoped>
.navigation__link {
  font-size: var(--text-sm);
  color: var(--text-color-soft);
  transition: color .3s ease;
}

.navigation__link:hover {
  color: var(--text-hover-color);
}
</style>