import { useCallback } from "react"
import { Slider } from "@mui/material"

import { useJobPlayerComputed, useJobPlayerSliceActions } from "../slice"
import { useVideoPlayerContext } from "../provider"
import { type TSliderChange } from "../types"

export const SliderZoom = () => {
  const {
    slice: { zoom },
    computed: { isDisabled },
  } = useJobPlayerComputed()
  const { setZoom } = useJobPlayerSliceActions()
  const { config } = useVideoPlayerContext()

  const handleZoom = useCallback<TSliderChange>(
    (...[, value]) => {
      setZoom(Number(value))
    },
    [setZoom],
  )

  return (
    <Slider
      marks
      track={false}
      {...config.Zoom}
      aria-label="Zoom"
      value={zoom}
      onChange={handleZoom}
      valueLabelDisplay="on"
      orientation={"vertical"}
      disabled={isDisabled}
    />
  )
}
