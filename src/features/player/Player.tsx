import { VideoPlayerProvider } from "./provider"
import { PlayerConfig } from "../../app/config/playerConfig"
import { VideoPlayerView } from "./components/VideoPlayerView"
import { useJobApiData } from "./api"

export const Player = ({ job_id = 63025 }) => {
  const {
    data: { meta, src },
    isFetching,
  } = useJobApiData(job_id)

  return isFetching || !meta ? (
    <>Loading metadata...</>
  ) : (
    <VideoPlayerProvider config={PlayerConfig} meta={meta} src={src}>
      <VideoPlayerView />
    </VideoPlayerProvider>
  )
}
