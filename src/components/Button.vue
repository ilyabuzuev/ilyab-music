<script setup lang="ts">
import type { IButton } from '@/models/IButton';

defineProps<IButton>();
</script>

<template>
  <button
    @click="$emit('playerHandle')"
    class="button"
    :class="{
      'button-no-paddings': noPaddings,
      'button-transparent': isTransparent,
    }"
  >
    <div class="button__text">
      {{ label }}
    </div>
    <slot name="icon"></slot>
  </button>
</template>

<style scoped>
.button {
  display: flex;
  padding: var(--size-sm) var(--size-xl);
  background-color: var(--button-bg-color);
  border-radius: var(--size-sm);
  transition: background-color 0.3s ease;
}

.button-no-paddings {
  padding: 0;
}

.button-transparent {
  background-color: transparent;
}

.button__text {
  font-size: var(--text-sm);
  font-weight: 500;
  color: var(--button-text-color);
}

.button:hover {
  background-color: var(--button-bg-color-hover);
}

.button.button-transparent:hover {
  background-color: transparent;
}

.button:active {
  background-color: var(--button-bg-color-active);
}

.button.button-transparent:active {
  background-color: transparent;
}
</style>
