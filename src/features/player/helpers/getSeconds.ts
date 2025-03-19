export const getSeconds = (time: string) => {
  const [minutes, seconds] = time.split(":").map(Number)
  const secondsTotal = minutes * 60 + seconds
  return secondsTotal
}
