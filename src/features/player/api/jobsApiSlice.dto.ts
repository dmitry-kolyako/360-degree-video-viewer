type TMeta = "meta"
export const PlayerMetadataMetaKey = "meta" as TMeta

type OnlyMeta = typeof PlayerMetadataMetaKey
type NoMeta = Exclude<string, OnlyMeta>

export type JobPlayerMeta = {
  job_id: number
}

export type PlayerFrame = {
  qr_val: string
  distance: string
  video_time?: string
  width?: number
  height?: number
  annotations: Array<PlayerFrameAnnotation>
}

export type PlayerFrameAnnotation = {
  id_nr: number
  category_name: string
  bbox: AnnotationBoundingBox
  area: string
  segmentation: Array<number>
  confidence: string
  real_NIO: boolean
  defect_size_mm: number
  operator_found: boolean
}

export type AnnotationBoundingBox = [number, number, number, number]

export type PlayerFrameCollection =  Array<PlayerFrame>

export type PlayerFrameMap = {
  [K in NoMeta]: PlayerFrame
}
export type PlayerFrameEntry = [string, PlayerFrame]
export type PlayerFrameEntries = Array<PlayerFrameEntry>

export type PlayerProcessedFrames = {
  [PlayerMetadataMetaKey]: JobPlayerMeta
} & PlayerFrameMap

export type PlayerGetJobQueryFramesResult = {
  byIds: PlayerFrameMap
  byIndex: PlayerFrameIndex
}
export type PlayerGetJobQueryResult = {
  frames: PlayerGetJobQueryFramesResult
  meta: JobPlayerMeta
  src: string
}

export type PlayerFrameIndex = Array<Array<string>>