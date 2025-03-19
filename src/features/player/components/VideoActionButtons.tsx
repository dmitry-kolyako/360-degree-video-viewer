import { useMemo } from "react"
import { IconButton, Stack, Tooltip } from "@mui/material"
import PauseIcon from "@mui/icons-material/Pause"
import PlayArrowIcon from "@mui/icons-material/PlayArrow"
import StopIcon from "@mui/icons-material/Stop"
import RotateLeftIcon from "@mui/icons-material/RotateLeft"
import { useVideoPlayerApiActions, useVideoPlayerComboActions } from "../hooks"
import { useJobPlayerComputed } from "../slice"

export const VideoActionButtons = () => {
  const {
    slice: { isPlaying },
    computed: { isDisabled },
  } = useJobPlayerComputed()

  const { handleStop, handlePause, handlePlay } = useVideoPlayerApiActions()
  const { handleResetAll } = useVideoPlayerComboActions()

  return useMemo(
    () => (
      <Stack direction={"row"}>
        {isPlaying ? (
          <IconButton disabled={isDisabled} onClick={handlePause}>
            <Tooltip title={"Pause"} placement={"top"}>
              <PauseIcon />
            </Tooltip>
          </IconButton>
        ) : (
          <IconButton disabled={isDisabled} onClick={handlePlay}>
            <Tooltip title={"Play"} placement={"top"}>
              <PlayArrowIcon />
            </Tooltip>
          </IconButton>
        )}

        <IconButton disabled={isDisabled} onClick={handleStop}>
          <Tooltip title={"Stop"} placement={"top"}>
            <StopIcon />
          </Tooltip>
        </IconButton>

        <IconButton disabled={isDisabled} onClick={handleResetAll}>
          <Tooltip title={"Stop, Reset Camera"} placement={"top"}>
            <RotateLeftIcon />
          </Tooltip>
        </IconButton>
      </Stack>
    ),
    [isPlaying, isDisabled, handleResetAll, handleStop, handlePlay, handlePause],
  )
}
