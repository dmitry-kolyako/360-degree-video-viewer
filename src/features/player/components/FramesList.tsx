import { type FC, useMemo } from "react"
import { Badge, type BadgeProps, List, ListItem, ListItemIcon, ListItemText, styled } from "@mui/material"
import type { AnnotationBoundingBox, PlayerFrameEntries, PlayerFrameEntry } from "../api"
import { useVideoPlayerContext } from "../provider"
import { IconPreviewFrame } from "./IconPreviewFrame"
import SpeakerNotesOutlinedIcon from "@mui/icons-material/SpeakerNotesOutlined"
import DocumentScannerOutlinedIcon from "@mui/icons-material/DocumentScannerOutlined"
import { ButtonJumpVideoTime } from "./ButtonJumpVideoTime"

type TWithFrames = {
  frames: PlayerFrameEntries
}
type Props = TWithFrames
export const FramesList: FC<Props> = ({ frames }) => {
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
      {frames.map(FrameListItem)}
    </List>
  )
}

const FrameListItem: FC<PlayerFrameEntry> = ([filename, frame]) => {
  const { video_time } = frame
  const {
    meta: { job_id },
  } = useVideoPlayerContext()

  const annotations = useMemo(() => frame.annotations || [], [frame])
  const boxes = useMemo(
    () =>
      annotations.reduce<Array<AnnotationBoundingBox>>((boxes, annotation) => {
        if (annotation.bbox) {
          boxes.push(annotation.bbox)
        }
        return boxes
      }, []),
    [annotations],
  )

  return (
    <ListItem
      key={filename}
      disablePadding
      dense
      secondaryAction={<IconPreviewFrame filename={filename} job_id={job_id} />}
    >
      <ListItemIconCenter>
        <ButtonJumpVideoTime video_time={video_time} />
      </ListItemIconCenter>
      <ListItemIconCenter>
        {Boolean(annotations.length) && (
          <ListItemIconBadge badgeContent={annotations.length} color={"primary"}>
            <SpeakerNotesOutlinedIcon />
          </ListItemIconBadge>
        )}
      </ListItemIconCenter>
      <ListItemIconCenter>
        {Boolean(boxes.length) && (
          <ListItemIconBadge badgeContent={boxes.length} color={"primary"}>
            <DocumentScannerOutlinedIcon />
          </ListItemIconBadge>
        )}
      </ListItemIconCenter>
      <ListItemText primary={filename} />
    </ListItem>
  )
}

const ListItemIconCenter = styled(ListItemIcon)({
  justifyContent: "center",
})
const ListItemIconBadge = styled(props => (
  <Badge
    anchorOrigin={{
      vertical: "top",
      horizontal: "left",
    }}
    {...props}
  />
))<BadgeProps>`
  & .MuiBadge-badge {
    top: 3px;
    padding: 0;
    font-size: 0.75em;
    border: 2px solid ${({ theme }) => theme.palette.background.paper};
  }
`
