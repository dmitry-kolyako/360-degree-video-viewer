import { type FC } from "react"
import { IconButton, Tooltip } from "@mui/material"
import RotateLeftIcon from "@mui/icons-material/RotateLeft"
import { useJobPlayerComputed } from "../slice"
import { useVideoPlayerCameraActions } from "../hooks"

export const IconResetCamera: FC = () => {
  const {
    computed: { isDisabled },
  } = useJobPlayerComputed()
  const { handleResetCamera } = useVideoPlayerCameraActions()

  return (
    <>
      <IconButton disabled={isDisabled} onClick={handleResetCamera}>
        <Tooltip title={"Reset Camera"} placement={"top"}>
          <RotateLeftIcon />
        </Tooltip>
      </IconButton>
    </>
  )
}
