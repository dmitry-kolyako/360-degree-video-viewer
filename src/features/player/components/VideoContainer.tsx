import { useMemo } from "react"
import { styled } from "@mui/material"
import { useVideoPlayerContext } from "../provider"
import { AbsoluteLoader } from "../../../components/AbsoluteLoader"
import { FrameBoundingBoxes } from "./FrameBoundingBoxes"
import { useJobPlayerSlice } from "../slice"

const Container = styled("div")`
  place-self: center;
  position: relative;
`

export const VideoContainer = () => {
  const { rendererPlaceholderRef, config } = useVideoPlayerContext()
  const { isSeeking, isReady } = useJobPlayerSlice()
  const isLoader = useMemo(() => !isReady || isSeeking, [isReady, isSeeking])

  return (
    <Container
      ref={rendererPlaceholderRef}
      sx={{
        ...config.Player,
      }}
    >
      {isLoader && <AbsoluteLoader />}
      <FrameBoundingBoxes />
    </Container>
  )
}
