import { SliderRail, styled } from "@mui/material"
import { useJobPlayerSlice } from "../slice"

const TimelineRail = styled(SliderRail)``

export const SliderTimelineRail: typeof SliderRail = props => {
  const { bufferedTime, duration } = useJobPlayerSlice()
  return <>
    <TimelineRail {...props} />
    <TimelineRail
      {...props}
      sx={{
        width: `${(bufferedTime / duration) * 100}%`
      }}
    />
  </>
}

