import { useCallback } from "react"
import { useJobPlayerSliceActions } from "../slice"
import { useVideoPlayerContext } from "../provider"

export const useVideoPlayerCameraActions = () => {
  const { config } = useVideoPlayerContext()
  const { setRotateX, setRotateY, setZoom } = useJobPlayerSliceActions()

  const handleResetCamera = useCallback(() => {
    setRotateX(config.Rotate.defaultX)
    setRotateY(config.Rotate.defaultY)
    setZoom(config.Zoom.defaultValue)
  }, [setRotateX, setRotateY, setZoom, config])

  return {
    handleResetCamera,
  }
}