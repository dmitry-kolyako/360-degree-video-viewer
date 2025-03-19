import { createSlice, type PayloadAction } from "@reduxjs/toolkit"
import { PlayerConfig } from "../../../app/config/playerConfig"
import { roundAngle } from "../helpers/roundAngle"

const initialState = {
  day: PlayerConfig.Timeline.defaultDay,
  zoom: PlayerConfig.Zoom.defaultValue,
  resumePlay: false,
  isReady: false,
  isPlaying: false,
  isSeeking: false,
  duration: 0,
  bufferedTime: 0,
  currentTimeProgress: 0,
  rotateX: PlayerConfig.Rotate.defaultX,
  rotateY: PlayerConfig.Rotate.defaultY,
}

export const jobPlayerSlice = createSlice({
  name: "jobPlayerSlice",
  initialState,
  reducers: {
    zoom: (state, { payload }: PayloadAction<number>) => {
      state.zoom = payload
    },
    resumePlay: (state, { payload }: PayloadAction<boolean>) => {
      state.resumePlay = payload
    },
    isPlaying: (state, { payload }: PayloadAction<boolean>) => {
      state.isPlaying = payload
    },
    isReady: (state, { payload }: PayloadAction<boolean>) => {
      state.isReady = payload
    },
    isSeeking: (state, { payload }: PayloadAction<boolean>) => {
      state.isSeeking = payload
    },
    duration: (state, { payload }: PayloadAction<number>) => {
      state.duration = payload
    },
    bufferedTime: (state, { payload }: PayloadAction<number>) => {
      state.bufferedTime = payload
    },
    currentTimeProgress: (state, { payload }: PayloadAction<number>) => {
      state.currentTimeProgress = payload
    },
    rotateX: (state, { payload }: PayloadAction<number>) => {
      state.rotateX = payload
    },
    shiftRotateX: (state, { payload }: PayloadAction<number>) => {
      state.rotateX = roundAngle(state.rotateX + payload)
    },
    rotateY: (state, { payload }: PayloadAction<number>) => {
      state.rotateY = payload
    },
    shiftRotateY: (state, { payload }: PayloadAction<number>) => {
      state.rotateY = roundAngle(state.rotateY + payload)
    },
  },
})
