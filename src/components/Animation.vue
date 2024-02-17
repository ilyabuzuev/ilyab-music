<script setup lang="ts">
import { getRandomIntNumber } from "@/helpers/getRandomIntNumber";
import {ref} from "vue";

const songAnimationInterval = ref();

const barHeight1 = ref(getBarHeight(1));
const barHeight2 = ref(getBarHeight(2));
const barHeight3 = ref(getBarHeight(3));
const barHeight4 = ref(getBarHeight(4));

function getBarHeight(index: number) {
  let height;

  if (index === 1) {
    height = getRandomIntNumber(60, 90);
  }

  if (index === 2) {
    height = getRandomIntNumber(65, 74);
  }

  if (index === 3) {
    height = getRandomIntNumber(55, 64);
  }

  if (index === 4) {
    height = getRandomIntNumber(45,60);
  }

  return { 'height': `${height}%` };
}

function animateSong() {
  barHeight1.value = getBarHeight(1);
  barHeight2.value = getBarHeight(2);
  barHeight3.value = getBarHeight(3);
  barHeight4.value = getBarHeight(4);
}

function startSongAnimation() {
  songAnimationInterval.value = setInterval(animateSong, 100);
}

function stopSongAnimationInterval() {
  clearInterval(songAnimationInterval.value);
}

startSongAnimation();
</script>

<template>
  <div class="animation">
    <div class="animation__bar" :style="barHeight1"></div>
    <div class="animation__bar" :style="barHeight2"></div>
    <div class="animation__bar" :style="barHeight3"></div>
    <div class="animation__bar" :style="barHeight4"></div>
  </div>
</template>

<style scoped>
.animation {
  display: flex;
  gap: 4px;
  height: 100%;
}

.animation__bar {
  align-self: end;
  width: 4px;
  background-color: var(--bar-bg-color);
  border-radius: var(--size-xs);
  transition: height .2s ease;
}
</style>