import { useJobData } from "../api"
import { useVideoPlayerContext } from "../provider"

export const useVideoPlayerFrames = () => {
  const {
    meta: { job_id },
  } = useVideoPlayerContext()

  const {
    frames: { byIds, byIndex },
  } = useJobData(job_id)

  return {
    byIds,
    byIndex,
  }
}
