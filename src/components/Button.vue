<script setup lang="ts">
import type { Button } from "@/models/Button";

defineProps<Button>();
</script>

<template>
  <button class="button">
    <div class="button__text">
      {{ label }}
    </div>
  </button>
</template>

<style scoped>
.button {
  padding: var(--size-sm) var(--size-xl);
  background-color: var(--button-bg-color);
  border-radius: var(--size-sm);
  transition: background-color .3s ease;
}

.button__text {
  font-size: var(--text-sm);
  font-weight: 500;
  color: var(--button-text-color);
}

.button:hover {
  background-color: var(--button-bg-color-hover);
}

.button:active {
  background-color: var(--button-bg-color-active);
}
</style>