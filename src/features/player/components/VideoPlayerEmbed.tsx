import { styled } from "@mui/material"
import { useVideoPlayerContext } from "../provider"

const Video = styled("video")``

export const VideoPlayerEmbed = () => {
  const { videoRef, config, src } = useVideoPlayerContext()

  return (
    <Video
      controls
      src={src}
      ref={videoRef}
      width={config.Player.width}
      height={config.Player.height}
      loop={false}
      muted={true}
      playsInline={true}
      crossOrigin={"anonymous"}
    />
  )
}
