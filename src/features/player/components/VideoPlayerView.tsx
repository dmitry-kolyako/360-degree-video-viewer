import { Container, Grid2, Stack } from "@mui/material"
import { Frames } from "./Frames"
import { FramesCurrent } from "./FramesCurrent"
import { VideoPlayer } from "./VideoPlayer"

export const VideoPlayerView = () => {
  return (
    <Container>
      <Grid2 container spacing={3}>
        <Grid2 size={6}>
          <Frames />
        </Grid2>
        <Grid2 size={6}>
          <Stack gap={3}>
            <VideoPlayer />
            <FramesCurrent />
          </Stack>
        </Grid2>
      </Grid2>
    </Container>
  )
}
