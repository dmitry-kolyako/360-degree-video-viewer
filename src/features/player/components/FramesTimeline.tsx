import { type FC, Fragment } from "react"
import { Button, List, ListItem, ListItemIcon, ListItemText } from "@mui/material"
import { type PlayerFrameIndex } from "../api"
import { createUid } from "../../../utils/createUid"
import { useVideoPlayerApiActions } from "../hooks"
import { formatSeconds } from "../helpers/formatSecondsToVideoTime"
import { useVideoPlayerContext } from "../provider"
import { IconPreviewFrame } from "./IconPreviewFrame"

type Props = {
  index: PlayerFrameIndex
}
export const FramesTimeline: FC<Props> = ({ index }) => {
  return (
    <List
      dense
      sx={{
        width: "100%",
        bgcolor: "background.paper",
        position: "relative",
        overflow: "auto",
        maxHeight: 480,
        "& ul": { padding: 0 },
      }}
    >
      {index.map(FrameListItem)}
    </List>
  )
}

type FramesTimelineItemProps = [Array<string>, number, Array<Array<string>>]
const FrameListItem = (...props: FramesTimelineItemProps) => {
  const key = createUid()
  const [filenames, timestamp] = props
  const { handleSetFrame } = useVideoPlayerApiActions()
  const {
    meta: { job_id },
  } = useVideoPlayerContext()

  return filenames.length ? (
    <ListItem
      key={key}
      disablePadding
      dense
      secondaryAction={
        <>
          {filenames.map(filename => (
            <Fragment key={filename}>
              <IconPreviewFrame filename={filename} job_id={job_id} />
            </Fragment>
          ))}
        </>
      }
    >
      <ListItemIcon sx={{ cursor: "pointer" }}>
        <Button onClick={() => handleSetFrame(timestamp)}>{formatSeconds(timestamp)}</Button>
      </ListItemIcon>

      <ListItemText primary={filenames.join(", ")}></ListItemText>
    </ListItem>
  ) : null
}
