import { ref, onMounted, onUnmounted } from 'vue';

export function useScreen() {
  const screenWidth = ref(window.innerWidth);
  const screenHeight = ref(window.innerHeight);

  function update() {
    screenWidth.value = window.innerWidth;
    screenHeight.value = window.innerHeight;
  }

  onMounted(() => window.addEventListener('resize', update));
  onUnmounted(() => window.removeEventListener('resize', update));

  return { screenWidth, screenHeight };
}
