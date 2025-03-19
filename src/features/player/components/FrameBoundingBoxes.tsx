import { useVideoPlayerFramesComputed } from "../hooks"
import { BoundingBox } from "./BoundingBox"

export const FrameBoundingBoxes = () => {
  const { visibleBoxes } = useVideoPlayerFramesComputed()

  return <>{visibleBoxes.map(BoundingBox)}</>
}
