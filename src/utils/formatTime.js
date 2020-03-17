export default function formatTime(time) {
  let fTime = new Date(time),
    y = fTime.getFullYear(),
    m = fTime.getMonth() + 1,
    d = fTime.getDate()
  return (
    y +
    '-' +
    (m < 10 ? '0' + m : m) +
    '-' +
    (d < 10 ? '0' + d : d) +
    ' ' +
    fTime.toTimeString().substr(0, 8)
  )
}
