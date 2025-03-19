import { type FC, useCallback, useMemo, useState } from "react"
import { JobsApiEndpoints } from "../api"
import { Dialog, DialogContent, IconButton } from "@mui/material"
import ImageSearchIcon from "@mui/icons-material/ImageSearch"
import { type SvgIconProps } from "@mui/material/SvgIcon/SvgIcon"

type IconPreviewFrameProps = {
  filename: string
  job_id: number
} & SvgIconProps
export const IconPreviewFrame: FC<IconPreviewFrameProps> = ({ filename, job_id, ...rest }) => {
  const [open, setOpen] = useState(false)
  const handleOpen = useCallback(() => setOpen(true), [])
  const handleClose = useCallback(() => setOpen(false), [])
  const framePreviewSrc = useMemo(() => JobsApiEndpoints.preview(job_id, filename, true), [job_id, filename])

  return <>
    <IconButton onClick={handleOpen}>
      <ImageSearchIcon {...rest} />
    </IconButton>

    <Dialog open={open} onClose={handleClose} maxWidth="md">
      <DialogContent>
        <img src={framePreviewSrc} alt={filename} style={{ maxWidth: "100%", height: "auto" }} />
      </DialogContent>
    </Dialog>
  </>
}