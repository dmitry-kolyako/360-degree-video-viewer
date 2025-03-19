import type { JobPlayerMeta } from "../api"
import type { RefObject } from "react"
import type { PerspectiveCamera, WebGLRenderer } from "three"
import type { TDispatchState } from "../types"

type TVideoHTML = HTMLVideoElement | null
type TDivHTML = HTMLDivElement | null
type TCamera = PerspectiveCamera | null
type TRenderer = WebGLRenderer | null

export type VideoPlayerContextType = {
  src: string
  meta: JobPlayerMeta
  config: TPlayerConfig

  videoRef: RefObject<HTMLVideoElement>
  video: TVideoHTML
  setVideo: TDispatchState<TVideoHTML>

  rendererPlaceholderRef: RefObject<HTMLDivElement>
  rendererPlaceholder: TDivHTML
  setRendererPlaceholder: TDispatchState<TDivHTML>

  cameraApi: TCamera
  setCamera: TDispatchState<TCamera>

  webGlRenderer: TRenderer
  setRenderer: TDispatchState<TRenderer>
}

export type PlayerProviderProps = {
  config: TPlayerConfig
  meta: JobPlayerMeta
  src: string
}

export type TPlayerConfig = {
  Player: {
    width: number
    height: number
  }
  Rotate: {
    defaultX: number
    defaultY: number
  }
  Zoom: {
    defaultValue: number
    min: number
    max: number
    step: number
  }
  Timeline: {
    defaultDay: string
  }
}