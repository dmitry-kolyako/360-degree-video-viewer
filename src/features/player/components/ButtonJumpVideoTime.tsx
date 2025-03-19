import { type FC } from "react"
import { type TWithVideoTime } from "../types"
import { Button, Tooltip } from "@mui/material"
import { getSeconds } from "../helpers/getSeconds"
import { useVideoPlayerApiActions } from "../hooks"

export const ButtonJumpVideoTime: FC<Partial<TWithVideoTime>> = ({ video_time }) => {
  const { handleSetFrame } = useVideoPlayerApiActions()

  return video_time ? (
    <Tooltip title={`Jump to ${video_time}`} placement={'top'}>
      <Button onClick={() => video_time && handleSetFrame(getSeconds(video_time))}>{video_time}</Button>
    </Tooltip>
  ) : (
    <Button disabled>--:--</Button>
  )
}