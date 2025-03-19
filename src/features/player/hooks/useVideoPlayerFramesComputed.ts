import { useMemo } from "react"
import type { AnnotationBoundingBox, PlayerFrame } from "../api"
import { useJobPlayerComputed } from "../slice"
import { useVideoPlayerContext } from "../provider"
import { useVideoPlayerFrames } from "./useVideoPlayerFrames"
import type { TBox, TFrameBBoxes } from "../types"

export const useVideoPlayerFramesComputed = () => {
  const { byIndex, byIds } = useVideoPlayerFrames()
  const {
    computed: { timeSeconds },
  } = useJobPlayerComputed()
  const {
    config: { Player: PlayerSize },
  } = useVideoPlayerContext()

  const visibleFrames = useMemo(
    () => (byIndex[timeSeconds] || []).map(idx => byIds[idx]),
    [byIndex, timeSeconds, byIds],
  )

  const visibleBoxes = useMemo(() => {
    const FrameSize = (visibleFrames.find(frame => Boolean(frame.width) && Boolean(frame.height)) as TBox) || PlayerSize

    const rescaleFn = rescaleBoxes(FrameSize, PlayerSize)

    const boxes = visibleFrames.reduce(reduceOnlyAnnotated, []).map(bbox => {
      return {
        box: rescaleFn(bbox),
        annotation: bbox.annotation,
      }
    })

    return boxes
  }, [visibleFrames, PlayerSize])

  return {
    byIndex,
    byIds,
    visibleFrames,
    visibleBoxes,
  }
}

// tools

const reduceOnlyAnnotated = (acc: Array<TFrameBBoxes>, frame: PlayerFrame) => {
  void (frame.annotations || []).forEach(annotation => {
    const { bbox } = annotation
    if (bbox.length === 4) {
      acc.push({
        frame,
        annotation,
        bbox,
      })
    }
  })
  return acc
}

const rescaleBoxes =
  (FrameSize: TBox, PlayerSize: TBox) =>
  ({ bbox, frame }: TFrameBBoxes) => {
    return scaleCoordinates(
      bbox,
      Boolean(frame.width) && Boolean(frame.height)
        ? {
            ...FrameSize,
            ...frame,
          }
        : FrameSize,
      PlayerSize,
    )
  }

const scaleCoordinates = (
  bbox: [number, number, number, number],
  originalSize: TBox,
  targetSize: TBox,
): AnnotationBoundingBox => {
  const [x1, y1, x2, y2] = bbox
  const scaleX = targetSize.width / originalSize.width
  const scaleY = targetSize.height / originalSize.height

  return [Math.round(x1 * scaleX), Math.round(y1 * scaleY), Math.round(x2 * scaleX), Math.round(y2 * scaleY)] as const
}
