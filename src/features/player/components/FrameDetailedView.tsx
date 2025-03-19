import { type FC } from "react"
import { Stack, Typography } from "@mui/material"
import type { PlayerFrame } from "../api"
import { Annotations } from "./Annotations"
import { Attributes } from "../../../components/Attributes"
import { createUid } from "../../../utils/createUid"

export const FrameDetailedView: FC<PlayerFrame> = props => {
  const { annotations, qr_val, ...rest } = props

  return (
    <Stack key={createUid()} gap={2}>
      <Typography variant={"h5"}>Frame `{qr_val}`:</Typography>
      <Stack pl={2}>
        <Attributes {...rest} />
      </Stack>
      <Stack>{Boolean(annotations.length) && <Annotations annotations={annotations} />}</Stack>
    </Stack>
  )
}
