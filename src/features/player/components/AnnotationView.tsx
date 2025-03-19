import type { FC } from "react"
import { Stack, Typography } from "@mui/material"
import { Attributes } from "../../../components/Attributes"
import type { PlayerFrameAnnotation } from "../api"

export const AnnotationView: FC<PlayerFrameAnnotation> = props => {
  return (
    <Stack key={props.id_nr}>
      <Typography p={0} m={0} variant={"subtitle1"}>
        Annotation `{props.id_nr}`
      </Typography>
      <Typography p={0} m={0} variant={"subtitle2"}>
        {props.category_name}
      </Typography>
      <Stack direction={"column"} gap={2}>
        <Stack gap={0.25} pl={2}>
          <Attributes {...props} />
        </Stack>
      </Stack>
    </Stack>
  )
}
