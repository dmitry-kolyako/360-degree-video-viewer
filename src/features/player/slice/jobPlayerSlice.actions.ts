import { jobPlayerSlice } from "./jobPlayerSlice"

// Action creators are generated for each case reducer function.
export const jobPlayerSliceActionMap = {
  setZoom: jobPlayerSlice.actions.zoom,
  setRotateX: jobPlayerSlice.actions.rotateX,
  setShiftRotateX: jobPlayerSlice.actions.shiftRotateX,
  setRotateY: jobPlayerSlice.actions.rotateY,
  setShiftRotateY: jobPlayerSlice.actions.shiftRotateY,
  setDuration: jobPlayerSlice.actions.duration,
  setIsReady: jobPlayerSlice.actions.isReady,
  setIsPlaying: jobPlayerSlice.actions.isPlaying,
  setIsSeeking: jobPlayerSlice.actions.isSeeking,
  setResumePlay: jobPlayerSlice.actions.resumePlay,
  setBufferedTime: jobPlayerSlice.actions.bufferedTime,
  setCurrentTimeProgress: jobPlayerSlice.actions.currentTimeProgress,
}

