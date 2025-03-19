import { useCallback } from "react"
import { useJobPlayerSliceActions } from "../slice"
import { useVideoPlayerContext } from "../provider"
import { useVideoPlayerCameraActions } from "./useVideoPlayerCameraActions"

export const useVideoPlayerApiActions = () => {
  const { video } = useVideoPlayerContext()
  const { setCurrentTimeProgress } = useJobPlayerSliceActions()

  const handlePlay = useCallback(() => {
    video && video.play()
  }, [video])

  const handlePause = useCallback(() => {
    video && video.pause()
  }, [video])

  const handleCurrentTime = useCallback(
    (newTime: number) => {
      if (video) {
        const safeTimestamp = Math.max(Math.min(newTime, video.duration), 0)
        setCurrentTimeProgress(safeTimestamp)
        video.currentTime = safeTimestamp
      }
    },
    [video, setCurrentTimeProgress],
  )

  const handleSeekPrev = useCallback(() => {
    handlePause()
    video && handleCurrentTime(video.currentTime - 1)
  }, [video, handleCurrentTime, handlePause])

  const handleSeekNext = useCallback(() => {
    handlePause()
    video && handleCurrentTime(video.currentTime + 1)
  }, [video, handleCurrentTime, handlePause])

  const handleSeekExact = useCallback(
    (newCurrentTime: number) => {
      handlePause()
      handleCurrentTime(newCurrentTime)
    },
    [handleCurrentTime, handlePause],
  )

  const { handleResetCamera } = useVideoPlayerCameraActions()
  const handleSetFrame = useCallback(
    (newCurrentTime: number) => {
      handlePause()
      handleResetCamera()
      handleCurrentTime(newCurrentTime)
    },
    [handleCurrentTime, handleResetCamera, handlePause],
  )

  const handleStop = useCallback(() => {
    video && video.pause()
    handleCurrentTime(0)
  }, [video, handleCurrentTime])

  return {
    handlePlay,
    handlePause,
    handleStop,
    handleSeekPrev,
    handleSeekNext,
    handleSeekExact,
    handleCurrentTime,
    handleSetFrame,
  }
}
