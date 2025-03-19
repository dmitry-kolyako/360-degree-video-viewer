import type { FC } from "react"
import { Stack, Typography } from "@mui/material"
import type { PlayerFrame } from "../api"
import { AnnotationView } from "./AnnotationView"

type AnnotationsPorps = Pick<PlayerFrame, "annotations">
export const Annotations: FC<AnnotationsPorps> = ({ annotations }) => {
  return (
    <Stack pl={2} gap={1}>
      <Typography variant={"h6"}>Annotations:</Typography>
      <Stack pl={2} gap={2}>{annotations.map(AnnotationView)}</Stack>
    </Stack>
  )
}
