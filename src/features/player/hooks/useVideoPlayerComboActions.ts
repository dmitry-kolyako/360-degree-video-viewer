import { useCallback } from "react"
import { useJobPlayerSlice, useJobPlayerSliceActions } from "../slice"
import { useVideoPlayerCameraActions } from "./useVideoPlayerCameraActions"
import { useVideoPlayerApiActions } from "./useVideoPlayerApiActions"

export const useVideoPlayerComboActions = () => {
  const { resumePlay } = useJobPlayerSlice()
  const { handleResetCamera } = useVideoPlayerCameraActions()
  const { handlePlay, handleStop, handleCurrentTime } = useVideoPlayerApiActions()
  const { setResumePlay } = useJobPlayerSliceActions()

  const handleResumePlay = useCallback(() => {
    setResumePlay(false)
    if (resumePlay) {
      handlePlay()
    }
  }, [resumePlay, setResumePlay, handlePlay])

  const handleSliderTimeChange = useCallback(
    (newValue: number) => {
      handleCurrentTime(newValue)
      handleResumePlay()
    },
    [handleCurrentTime, handleResumePlay],
  )

  const handleResetAll = useCallback(() => {
    handleResetCamera()
    handleStop()
  }, [handleResetCamera, handleStop])

  return {
    handleResumePlay,
    handleSliderTimeChange,
    handleResetAll,
  }
}