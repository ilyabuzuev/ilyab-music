export function convertTime(currentTime: number | undefined) {
  if (!currentTime) return '0:00';

  const minutes = Math.floor(currentTime / 60);
  const seconds = String(Math.floor(currentTime) % 60).padStart(2, '0');

  return `${minutes}:${seconds}`;
}
