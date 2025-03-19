import { Stack } from "@mui/material"
import { SliderTimeline } from "./SliderTimeline"
import { VideoTime } from "./VideoTime"
import { VideoActionButtons } from "./VideoActionButtons"

export const VideoControls = () => {
  return (
    <Stack direction={"row"} alignItems={"center"} gap={4}>
      <VideoActionButtons />
      <SliderTimeline />
      <VideoTime />
    </Stack>
  )
}
