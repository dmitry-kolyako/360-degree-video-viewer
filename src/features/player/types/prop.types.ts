import type { SliderProps } from "@mui/material"
import type { AnnotationBoundingBox, PlayerFrame, PlayerFrameAnnotation } from "../api"

export type TDispatchState<T> = React.Dispatch<React.SetStateAction<T>>
export type TWithVideo = { video: HTMLVideoElement }
export type TWithVideoTime = { video_time: string }
export type TSliderChange = Required<SliderProps>["onChange"]

export type TFrameBBoxes = {
  bbox: AnnotationBoundingBox
  frame: PlayerFrame
  annotation: PlayerFrameAnnotation
}

export type TBox = {
  width: number
  height: number
}

