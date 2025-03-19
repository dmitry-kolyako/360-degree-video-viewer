export const radToDeg = (rad: number): number => {
  const degrees = (rad * 180) / Math.PI
  return Math.round(degrees * 100) / 100
}

export const radToDegLabel = (rad: number) => Math.round(
  radToDeg(rad)
)+'°'