export default function formatTime(time) {
  const fTime = new Date(time);
  const y = fTime.getFullYear();
  const m = fTime.getMonth() + 1;
  const d = fTime.getDate();
  return `${y}-${m < 10 ? `0${m}` : m}-${d < 10 ? `0${d}` : d} ${fTime
    .toTimeString()
    .substr(0, 8)}`;
}
