import { Slider, type SliderProps } from "@mui/material"
import { useJobPlayerComputed, useJobPlayerSliceActions } from "../slice"
import {
  useVideoPlayerComboActions,
  useVideoPlayerApiActions
} from "../hooks"
import { SliderTimelineRail } from "./SliderTimelineRail"

const slots = {
  rail: SliderTimelineRail,
}
export const SliderTimeline = () => {
  const {
    computed: { isDisabled },
    slice: { duration, isPlaying, currentTimeProgress },
  } = useJobPlayerComputed()

  const { setCurrentTimeProgress, setResumePlay } = useJobPlayerSliceActions()

  const { handlePause } = useVideoPlayerApiActions()
  const { handleSliderTimeChange } = useVideoPlayerComboActions()

  const handleTimeScrollChange: SliderProps["onChange"] = (...[, newTime]) => {
    handlePause()
    setCurrentTimeProgress(newTime as number)
    if (isPlaying) {
      setResumePlay(isPlaying)
    }
  }

  const handleTimeScrollChangeCommited: SliderProps["onChangeCommitted"] = (...[, newTime]) => {
    handleSliderTimeChange(newTime as number)
  }

  return (
    <Slider
      disabled={isDisabled}
      min={0}
      max={duration}
      step={0.1}
      valueLabelDisplay="on"
      value={currentTimeProgress}
      onChange={handleTimeScrollChange}
      onChangeCommitted={handleTimeScrollChangeCommited}
      aria-labelledby="timeline-slider"
      valueLabelFormat={Math.round}
      slots={slots}
    />
  )
}
