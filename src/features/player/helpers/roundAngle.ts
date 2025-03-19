export const roundAngle = (rad: number) => {
  if (rad > Math.PI) {
    rad = ((rad + Math.PI) % (2 * Math.PI)) - Math.PI
  } else if (rad < Math.PI) {
    rad = ((rad - Math.PI) % (2 * Math.PI)) + Math.PI
  }
  return Math.round((rad % Math.PI) * 100) / 100
}

