import { type FC, memo } from "react"
import { Paper, Stack, Typography } from "@mui/material"
import { FrameDetailedView } from "./FrameDetailedView"
import { type PlayerFrameCollection } from "../api"
import { useVideoPlayerFramesComputed } from "../hooks"

export const FramesCurrent: FC = () => {
  const { visibleFrames } = useVideoPlayerFramesComputed()

  return (
    <Stack gap={1}>
      <Typography variant={"h4"}>Active Frames:</Typography>
      <Paper>
        <FramesVisible frames={visibleFrames} />
      </Paper>
    </Stack>
  )
}

type Props = {
  frames: PlayerFrameCollection
}
export const FramesVisible: FC<Props> = memo(({ frames }) => (
  <Stack p={2} gap={2}>
    {frames.map(FrameDetailedView)}
  </Stack>
))
