<script setup lang="ts">
import { ref } from 'vue';
import { usePlayerStore } from '@/stores/player.store';

const slider = ref<HTMLDivElement>();
const progress = ref<HTMLDivElement>();
const thumb = ref<HTMLDivElement>();
const playerStore = usePlayerStore();

function sliderTimeUpadte(evt: MouseEvent) {
  const sliderRect = slider.value!.getBoundingClientRect();

  let newLeft = evt.clientX - sliderRect?.left;
  let rightEdge = slider.value!.offsetWidth;
  let currentSongDuration = playerStore.currentSong.audio!.duration;
  let targetX = (newLeft * currentSongDuration) / rightEdge;

  playerStore.currentSong.audio!.currentTime = targetX;
}
</script>

<template>
  <div class="slider" @click="sliderTimeUpadte($event)" ref="slider">
    <div
      class="slider__progress"
      ref="progress"
      :style="`width: ${!slider || (slider?.offsetWidth / playerStore.currentSong.audio!.duration) * (playerStore.currentSong.currentTime ? playerStore.currentSong.currentTime : 0)}px`"
    ></div>
    <div
      class="slider__thumb"
      ref="thumb"
      :style="`transform: translateX(${!slider || (slider?.offsetWidth / playerStore.currentSong.audio!.duration) * (playerStore.currentSong.currentTime ? playerStore.currentSong.currentTime : 0)}px)`"
    ></div>
  </div>
</template>

<style scoped>
.slider {
  height: 6px;
  background-color: var(--bg-color);
  border-radius: var(--size-xs);
  cursor: pointer;
}

.slider__progress {
  height: 100%;
  width: 0px;
  background-color: var(--bg-color-mute);
  border-radius: var(--size-xs);
}

.slider__thumb {
  position: relative;
  bottom: 8px;
  right: 4px;
  height: 10px;
  width: 10px;
  background-color: black;
  border-radius: 50%;
}
</style>
